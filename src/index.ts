import {
  Canister,
  Err,
  Ok,
  Principal,
  Record,
  Result,
  StableBTreeMap,
  Variant,
  Vec,
  Opt,
  bool,
  ic,
  nat64,
  query,
  update,
  text,
} from "azle/experimental";

import { v4 as uuidv4 } from "uuid";

// Core Types

const Review = Record({
  author: Principal,
  rating: nat64,
  comment: text,
  date: nat64,
});

// Category enum
const Category = Variant({
  Venue: text,
  Catering: text,
  Photography: text,
  Music: text,
  Decor: text,
  Planning: text,
  Attire: text,
  Beauty: text,
  Transport: text,
  Stationery: text,
  Cake: text,
  Favors: text,
  Other: text,
});

const Vendor = Record({
  id: text,
  owner: Principal,
  name: text,
  category: Category,
  description: text,
  serviceCost: nat64,
  availability: Vec(nat64), // timestamps of available dates
  rating: nat64,
  reviews: Vec(Review),
  bookings: Vec(Principal), // wedding IDs
  verified: bool,
  portfolio: Vec(text), // URLs to portfolio items
});

type Vendor = typeof Vendor.tsType;

const VendorBooking = Record({
  vendorId: text,
  weddingId: text,
  weddingOffer: nat64,
  additionalDetails: Opt(text),
  status: text, // "pending", "confirmed", "paid"
  date: nat64,
});

type VendorBooking = typeof VendorBooking.tsType;

const TimelineItem = Record({
  time: nat64,
  description: text,
  responsible: text,
  status: text, // "pending", "completed"
});

const Task = Record({
  id: text,
  title: text,
  description: text,
  deadline: nat64,
  assignedTo: text,
  status: text, // "pending", "in-progress", "completed"
  budget: nat64,
});

// Table Assignment Enum
const TableAssignment = Variant({
  VIPTable: text,
  familyTable: text,
  Table1: text,
  Table2: text,
  Table3: text,
  Table4: text,
  Table5: text,
  Table6: text,
  Table7: text,
  Table8: text,
  Table9: text,
  Table10: text,
  unassigned: text,
});

const Guest = Record({
  name: text,
  email: text,
  rsvpStatus: text, // "pending", "confirmed", "declined"
  dietaryRestrictions: text,
  plusOne: bool,
  tableAssignment: TableAssignment,
});

type Guest = typeof Guest.tsType;

const RegistryItem = Record({
  name: text,
  description: text,
  price: nat64,
  status: text, // "available", "purchased"
  purchasedBy: text,
});

const Wedding = Record({
  id: text,
  coupleNames: Vec(text),
  date: nat64,
  budget: nat64,
  location: text,
  guestCount: nat64,
  vendors: Vec(VendorBooking),
  timeline: Vec(TimelineItem),
  tasks: Vec(Task),
  guestList: Vec(Guest),
  registry: Vec(RegistryItem),
  status: text, // "planning", "upcoming", "completed"
});

type Wedding = typeof Wedding.tsType;

/**
 * Payloads to be used in the canister methods
 */

// Vendor Management
const RegisterVendorPayload = Record({
  name: text,
  category: Category,
  description: text,
  serviceCost: nat64,
  availability: Vec(nat64),
  portfolio: Vec(text),
});

// Wedding Planning
const CreateWeddingPayload = Record({
  coupleNames: Vec(text),
  date: nat64,
  budget: nat64,
  location: text,
  guestCount: nat64,
});

// GuestRSVP P
const GuestRSVPPayload = Record({
  weddingId: text,
  name: text,
  guestEmail: text,
  dietaryRestrictions: text,
  plusOne: bool,
  tableAssignment: text,
});

// Vendor Booking
const BookVendorPayload = Record({
  vendorId: text,
  weddingId: text,
  weddingOffer: nat64,
  additionalDetails: Opt(text),
});

// Guest Management
const UpdateGuestRSVPPayload = Record({
  guestEmail: text,
  status: text,
});

// Storage
const vendorStorage = StableBTreeMap<text, Vendor>(0);
const weddingStorage = StableBTreeMap<text, Wedding>(1);

// Error Variants
const Message = Variant({
  VendorNotFound: text,
  WeddingNotFound: text,
  DateUnavailable: text,
  UnauthorizedAction: text,
  BudgetExceeded: text,
  InvalidDate: text,
});

type Errors = typeof Message.tsType;

export default Canister({
  // Vendor Management
  registerVendor: update(
    [RegisterVendorPayload],
    Result(Record({ message: text, vendor: Vendor }), Message),
    (payload) => {
      try {
        const vendorId = uuidv4();
        if (vendorStorage.get(vendorId)) {
          return Err({ UnauthorizedAction: "Vendor already registered" });
        }

        const createdVendor: Vendor = {
          ...payload,
          id: vendorId,
          owner: ic.caller(),
          rating: 0n,
          reviews: [],
          bookings: [],
          verified: false,
        };

        vendorStorage.insert(vendorId, createdVendor);

        return Ok({
          message: "Vendor registered successfully",
          vendor: createdVendor,
        });
      } catch (error) {
        return Err({ UnauthorizedAction: `Registration failed: ${error}` });
      }
    }
  ),

  createWedding: update(
    [CreateWeddingPayload],
    Result(Record({ message: text, wedding: Wedding }), Message),
    (payload) => {
      try {
        if (payload.date < ic.time()) {
          return Err({ InvalidDate: "Wedding date must be in the future" });
        }

        const weddingId = uuidv4();

        const createdWedding: Wedding = {
          ...payload,
          id: weddingId,
          vendors: [],
          timeline: [],
          tasks: [],
          guestList: [],
          registry: [],
          status: "planning",
        };

        weddingStorage.insert(weddingId, createdWedding);

        return Ok({
          message: "Wedding created successfully",
          wedding: createdWedding,
        });
      } catch (error) {
        return Err({ UnauthorizedAction: `Wedding creation failed: ${error}` });
      }
    }
  ),

  bookVendor: update(
    [BookVendorPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
        vendor: Vendor,
        booking: VendorBooking,
      }),
      Message
    ),
    (payload) => {
      try {
        const wedding = weddingStorage.get(payload.weddingId);
        const vendor = vendorStorage.get(payload.vendorId);

        if (!wedding) {
          return Err({ WeddingNotFound: "Wedding not found" });
        }

        if (!vendor) {
          return Err({ VendorNotFound: "Vendor not found" });
        }

        // Check vendor availability
        if (!vendor.availability.includes(wedding.date)) {
          return Err({
            DateUnavailable: "Vendor not available on wedding date",
          });
        }

        const vendorBooking: VendorBooking = {
          ...payload,
          status: "pending",
          date: wedding.date,
        };

        const updatedWedding = {
          ...wedding,
          vendors: [...wedding.vendors, vendorBooking],
        };

        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "Vendor booked successfully",
          wedding: updatedWedding,
          vendor: vendor,
          booking: vendorBooking,
        });
      } catch (error) {
        return Err({ UnauthorizedAction: `Booking failed: ${error}` });
      }
    }
  ),

  // Guest Management
  submitGuestRSVP: update(
    [GuestRSVPPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
        updatedGuest: Guest,
      }),
      Message
    ),
    (payload) => {
      try {
        const wedding = weddingStorage.get(payload.weddingId);
        if (!wedding) {
          return Err({ WeddingNotFound: "Wedding not found" });
        }

        // Find the guest that was updated
        const guest = wedding.guestList.find(
          (g) => g.email === payload.guestEmail
        );
        if (!guest) {
          return Err({
            UnauthorizedAction: "Guest not found in the wedding list",
          });
        }

        const updatedGuest = { ...guest, rsvpStatus: payload.status };

        // Update the guest list
        const updatedGuests = wedding.guestList.map((g) =>
          g.email === payload.guestEmail ? updatedGuest : g
        );

        const updatedWedding: Wedding = {
          ...wedding,
          guestList: updatedGuests,
        };

        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "RSVP updated successfully",
          wedding: updatedWedding,
          updatedGuest: updatedGuest,
        });
      } catch (error) {
        return Err({ UnauthorizedAction: `RSVP update failed: ${error}` });
      }
    }
  ),

  // Timeline Management
  addTimelineItem: update(
    [Principal, typeof TimelineItem.tsType],
    Result(text, typeof Errors.tsType),
    (weddingId, item) => {
      const wedding = weddingStorage.get(weddingId);
      if (!wedding) {
        return Err({ WeddingNotFound: "Wedding not found" });
      }

      const updatedWedding = {
        ...wedding,
        timeline: [...wedding.timeline, item],
      };

      weddingStorage.insert(weddingId, updatedWedding);
      return Ok("Timeline item added successfully");
    }
  ),

  // Queries
  getWeddingDetails: query(
    [Principal],
    Result(typeof Wedding.tsType, typeof Errors.tsType),
    (weddingId) => {
      const wedding = weddingStorage.get(weddingId);
      if (!wedding) {
        return Err({ WeddingNotFound: "Wedding not found" });
      }
      return Ok(wedding);
    }
  ),

  getVendorDetails: query(
    [Principal],
    Result(typeof Vendor.tsType, typeof Errors.tsType),
    (vendorId) => {
      const vendor = vendorStorage.get(vendorId);
      if (!vendor) {
        return Err({ VendorNotFound: "Vendor not found" });
      }
      return Ok(vendor);
    }
  ),

  searchVendors: query([text], Vec(typeof Vendor.tsType), (category) => {
    return vendorStorage
      .values()
      .filter((vendor) => vendor.category === category);
  }),
});
