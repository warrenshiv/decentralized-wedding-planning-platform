// Imports
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

/**
 * Enumerations
 */
// Service Categories
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

/**
 * Core Types
 */

// Review Record
const Review = Record({
  author: Principal,
  rating: nat64,
  comment: text,
  date: nat64,
});

// Vendor Details Record
const Vendor = Record({
  id: text,
  owner: Principal,
  name: text,
  category: Category,
  description: text,
  serviceCost: nat64,
  availability: Vec(text), // ISO timestamps of available dates
  rating: nat64,
  reviews: Vec(Review),
  bookings: Vec(Principal), // wedding IDs
  verified: bool,
  portfolio: Vec(text), // URLs to portfolio items
});

type Vendor = typeof Vendor.tsType;

// Vendor Booking Record
const VendorBooking = Record({
  vendorId: text,
  weddingId: text,
  weddingOffer: nat64,
  additionalDetails: Opt(text),
  status: text, // "pending", "confirmed", "paid"
  date: text,
});

type VendorBooking = typeof VendorBooking.tsType;

// Timeline Item Record
const TimelineItem = Record({
  weddingId: text,
  time: text,
  description: text,
  responsible: text,
  status: text, // "pending", "completed"
});

type TimelineItem = typeof TimelineItem.tsType;

// Task Record
const Task = Record({
  id: text,
  title: text,
  description: text,
  deadline: text,
  assignedTo: text,
  status: text, // "pending", "in-progress", "completed"
  budget: nat64,
});

type Task = typeof Task.tsType;

// Guest Details Record
const Guest = Record({
  name: text,
  guestEmail: text,
  rsvpStatus: text, // "pending", "confirmed", "declined"
  dietaryRestrictions: text,
  plusOne: bool,
  tableAssignment: TableAssignment,
});

type Guest = typeof Guest.tsType;

// Registry Item Record
const RegistryItem = Record({
  name: text,
  description: text,
  price: nat64,
  status: text, // "available", "purchased"
  purchasedBy: text,
});

type RegistryItem = typeof RegistryItem.tsType;

// Wedding Record with all details
const Wedding = Record({
  id: text,
  coupleNames: Vec(text),
  date: text,
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
 * Payload Definitions
 */

// Vendor Management Payload
const RegisterVendorPayload = Record({
  name: text,
  category: Category,
  description: text,
  serviceCost: nat64,
  availability: Vec(text),
  portfolio: Vec(text),
});

// Wedding Planning Payload
const CreateWeddingPayload = Record({
  coupleNames: Vec(text),
  date: text,
  budget: nat64,
  location: text,
  guestCount: nat64,
});

// GuestRSVP Payload
const GuestRSVPPayload = Record({
  weddingId: text,
  name: text,
  guestEmail: text,
  dietaryRestrictions: text,
  plusOne: bool,
});

// Approve RSVP Payload
const ApproveRSVPPayload = Record({
  weddingId: text,
  guestEmail: text,
  tableAssignment: TableAssignment,
});

// Vendor Booking
const BookVendorPayload = Record({
  vendorId: text,
  weddingId: text,
  weddingOffer: nat64,
  additionalDetails: Opt(text),
});

// selectVendorForService Payload
const SelectVendorForServicePayload = Record({
  weddingId: text,
  vendorId: text,
  category: Category,
});

// Timeline Item Payload
const AddTimelineItemPayload = Record({
  weddingId: text,
  time: text,
  description: text,
  responsible: text,
  status: text,
});

// Task Payload
const AddTaskPayload = Record({
  weddingId: text,
  title: text,
  description: text,
  deadline: text,
  assignedTo: text,
  budget: nat64,
});

// Update Task Status Payload
const UpdateTaskStatusPayload = Record({
  weddingId: text,
  taskId: text,
  status: text,
});

// Delete Task Payload
const DeleteTaskPayload = Record({
  weddingId: text,
  taskId: text,
});

// Add Registry Item Payload
const AddRegistryItemPayload = Record({
  weddingId: text,
  name: text,
  description: text,
  price: nat64,
});

// Update Registry Item Status Payload
const UpdateRegistryItemStatusPayload = Record({
  weddingId: text,
  itemName: text,
  status: text,
  purchasedBy: text,
});

// Delete Registry Item Payload
const DeleteRegistryItemPayload = Record({
  weddingId: text,
  itemName: text,
});

/**
 * Storage Setup
 */
const vendorStorage = StableBTreeMap<text, Vendor>(0);
const weddingStorage = StableBTreeMap<text, Wedding>(1);

// Error Variants
const Message = Variant({
  VendorNotFound: text,
  WeddingNotFound: text,
  NoTimeLineItemsFound: text,
  DateUnavailable: text,
  UnauthorizedAction: text,
  BudgetExceeded: text,
  InvalidDate: text,
});

type Message = typeof Message.tsType;

/**
 * Canister Definition
 */

export default Canister({
  /**
   * Vendor Management
   */
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

  /**
   * Vendor Queries
   */

  // Get Vendor Details by ID
  getVendorDetails: query([text], Result(Vendor, Message), (vendorId) => {
    const vendor = vendorStorage.get(vendorId);
    if (!vendor) {
      return Err({ VendorNotFound: "Vendor not found" });
    }
    return Ok(vendor);
  }),

  // Get Vendors by Category
  searchVendors: query([text], Result(Vec(Vendor), Message), (category) => {
    try {
      const matchingVendors = vendorStorage
        .values()
        .filter((vendor) => Object.keys(vendor.category)[0] === category);

      if (matchingVendors.length === 0) {
        return Err({
          VendorNotFound: `No vendors found in the '${category}' category`,
        });
      }

      return Ok(matchingVendors);
    } catch (error) {
      return Err({ UnauthorizedAction: `Search failed: ${error}` });
    }
  }),

  // Get ALl Vendors
  getAllVendors: query([], Result(Vec(Vendor), Message), () => {
    const vendors = vendorStorage.values();

    if (vendors.length === 0) {
      // Return an empty array wrapped in Ok
      return Ok([]);
    }

    // Return the list of vendors
    return Ok(vendors);
  }),

  /**
   * Wedding Management
   */
  createWedding: update(
    [CreateWeddingPayload],
    Result(Record({ message: text, wedding: Wedding }), Message),
    (payload) => {
      const time = new Date().toISOString();
      try {
        if (payload.date < time) {
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

  /**
   * Wedding Queries
   */

  // Get Wedding Details by ID
  getWeddingDetails: query([text], Result(Wedding, Message), (weddingId) => {
    const wedding = weddingStorage.get(weddingId);
    if (!wedding) {
      return Err({ WeddingNotFound: "Wedding not found" });
    }
    return Ok(wedding);
  }),

  // Get All Weddings
  getAllWeddings: query([], Result(Vec(Wedding), Message), () => {
    const weddings = weddingStorage.values();
    if (weddings.length === 0) {
      return Err({ WeddingNotFound: "No weddings found" });
    }

    return Ok(weddings);
  }),

  // Get Wedding Timeline
  getWeddingTimeline: query(
    [text],
    Result(Vec(TimelineItem), Message),
    (weddingId) => {
      const wedding = weddingStorage.get(weddingId);

      if (!wedding) {
        return Err({ WeddingNotFound: "Wedding not found" });
      }

      // Check if the timeline is empty
      if (wedding.timeline.length === 0) {
        return Err({ NoTimeLineItemsFound: "No timeline items for this wedding" });
      }

      return Ok(wedding.timeline);
    }
  ),

  /**
   * Guest Management
   * RSVP Submission
   * Guest RSVP Approval
   * Table Assignment
   * Guest Queries
   * Guest RSVP Queries
   * Guest RSVP List
   * Guest RSVP Status
   * Guest RSVP Count

   */

  // Guest RSVP Submission
  submitGuestRSVP: update(
    [GuestRSVPPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
        newGuest: Guest,
      }),
      Message
    ),
    (payload) => {
      try {
        const wedding = weddingStorage.get(payload.weddingId);
        if (!wedding) {
          return Err({ WeddingNotFound: "Wedding not found" });
        }

        // Check if the guest already exists
        const existingGuest = wedding.guestList.find(
          (g) => g.guestEmail === payload.guestEmail
        );
        if (existingGuest) {
          return Err({
            UnauthorizedAction: "Guest RSVP already submitted",
          });
        }

        // Create the new guest RSVP
        const newGuest: Guest = {
          ...payload,
          rsvpStatus: "pending", // Default RSVP status for submission
          tableAssignment: { unassigned: "Unassigned" }, // Default table assignment
        };

        // Update the wedding's guest list
        const updatedWedding: Wedding = {
          ...wedding,
          guestList: [...wedding.guestList, newGuest],
        };

        // Save the updated wedding details
        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "Guest RSVP submitted successfully",
          wedding: updatedWedding,
          newGuest: newGuest,
        });
      } catch (error) {
        return Err({
          UnauthorizedAction: `Guest RSVP submission failed: ${error}`,
        });
      }
    }
  ),

  // Guest RSVP Approval and Table Assignment
  approveGuestRSVP: update(
    [ApproveRSVPPayload],
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

        // Find the guest in the wedding's guest list
        const guest = wedding.guestList.find(
          (g) => g.guestEmail === payload.guestEmail
        );
        if (!guest) {
          return Err({
            UnauthorizedAction: "Guest not found in the wedding list",
          });
        }

        // Update the guest's RSVP status and table assignment
        const updatedGuest: Guest = {
          ...guest,
          rsvpStatus: "confirmed",
          tableAssignment: { ...payload.tableAssignment },
        };

        // Update the wedding's guest list
        const updatedGuestList = wedding.guestList.map((g) =>
          g.guestEmail === payload.guestEmail ? updatedGuest : g
        );

        const updatedWedding: Wedding = {
          ...wedding,
          guestList: updatedGuestList,
        };

        // Save the updated wedding
        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "RSVP approved and table assigned successfully",
          wedding: updatedWedding,
          updatedGuest: updatedGuest,
        });
      } catch (error) {
        return Err({ UnauthorizedAction: `Failed to approve RSVP: ${error}` });
      }
    }
  ),

  /**
   * Guest Queries
   */

  // Guest List
  getGuestList: query([text], Result(Vec(Guest), Message), (weddingId) => {
    const wedding = weddingStorage.get(weddingId);
    if (!wedding) {
      return Err({ WeddingNotFound: "Wedding not found" });
    }
    return Ok(wedding.guestList);
  }),

  // Guest RSVP List
  getGuestDetails: query(
    [text, text], // [weddingId, guestEmail]
    Result(Guest, Message),
    (weddingId, guestEmail) => {
      const wedding = weddingStorage.get(weddingId);
      if (!wedding) {
        return Err({ WeddingNotFound: "Wedding not found" });
      }

      const guest = wedding.guestList.find((g) => g.guestEmail === guestEmail);
      if (!guest) {
        return Err({
          UnauthorizedAction: "Guest not found in the wedding list",
        });
      }

      return Ok(guest);
    }
  ),

  // Guest RSVP Status
  getGuestRSVPStatus: query(
    [text, text], // [weddingId, guestEmail]
    Result(text, Message),
    (weddingId, guestEmail) => {
      const wedding = weddingStorage.get(weddingId);
      if (!wedding) {
        return Err({ WeddingNotFound: "Wedding not found" });
      }

      const guest = wedding.guestList.find((g) => g.guestEmail === guestEmail);
      if (!guest) {
        return Err({
          UnauthorizedAction: "Guest not found in the wedding list",
        });
      }

      return Ok(guest.rsvpStatus);
    }
  ),

  // Guest RSVP Count
  getGuestCount: query([text], Result(nat64, Message), (weddingId) => {
    const wedding = weddingStorage.get(weddingId);
    if (!wedding) {
      return Err({ WeddingNotFound: "Wedding not found" });
    }

    return Ok(BigInt(wedding.guestList.length));
  }),

  /**
   * Timeline Item Management
   */
  addTimelineItem: update(
    [AddTimelineItemPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
      }),
      Message
    ),
    (payload) => {
      const wedding = weddingStorage.get(payload.weddingId);
      if (!wedding) {
        return Err({ WeddingNotFound: "Wedding not found" });
      }

      const timelineItem: TimelineItem = {
        ...payload,
        status: "pending",
      };

      const updatedWedding = {
        ...wedding,
        timeline: [...wedding.timeline, timelineItem],
      };

      weddingStorage.insert(payload.weddingId, updatedWedding);

      return Ok({
        message: "Timeline item added successfully",
        wedding: updatedWedding,
      });
    }
  ),

  /**
   * Task Management
   */

  // Add Task
  addTask: update(
    [AddTaskPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
        newTask: Task,
      }),
      Message
    ),
    (payload) => {
      try {
        const wedding = weddingStorage.get(payload.weddingId);
        if (!wedding) {
          return Err({ WeddingNotFound: "Wedding not found" });
        }

        const newTask: Task = {
          id: uuidv4(),
          title: payload.title,
          description: payload.description,
          deadline: payload.deadline,
          assignedTo: payload.assignedTo,
          status: "pending",
          budget: payload.budget,
        };

        const updatedWedding: Wedding = {
          ...wedding,
          tasks: [...wedding.tasks, newTask],
        };

        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "Task added successfully",
          wedding: updatedWedding,
          newTask,
        });
      } catch (error) {
        return Err({ UnauthorizedAction: `Failed to add task: ${error}` });
      }
    }
  ),

  // Update Task Status
  updateTaskStatus: update(
    [UpdateTaskStatusPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
        updatedTask: Task,
      }),
      Message
    ),
    (payload) => {
      try {
        const wedding = weddingStorage.get(payload.weddingId);
        if (!wedding) {
          return Err({ WeddingNotFound: "Wedding not found" });
        }

        const taskIndex = wedding.tasks.findIndex(
          (task) => task.id === payload.taskId
        );
        if (taskIndex === -1) {
          return Err({ UnauthorizedAction: "Task not found" });
        }

        const updatedTask: Task = {
          ...wedding.tasks[taskIndex],
          status: payload.status,
        };

        const updatedWedding: Wedding = {
          ...wedding,
          tasks: [
            ...wedding.tasks.slice(0, taskIndex),
            updatedTask,
            ...wedding.tasks.slice(taskIndex + 1),
          ],
        };

        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "Task status updated successfully",
          wedding: updatedWedding,
          updatedTask,
        });
      } catch (error) {
        return Err({
          UnauthorizedAction: `Failed to update task status: ${error}`,
        });
      }
    }
  ),

  // Delete Task
  deleteTask: update(
    [DeleteTaskPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
      }),
      Message
    ),
    (payload) => {
      try {
        const wedding = weddingStorage.get(payload.weddingId);
        if (!wedding) {
          return Err({ WeddingNotFound: "Wedding not found" });
        }

        const updatedTasks = wedding.tasks.filter(
          (task) => task.id !== payload.taskId
        );
        if (updatedTasks.length === wedding.tasks.length) {
          return Err({ UnauthorizedAction: "Task not found" });
        }

        const updatedWedding: Wedding = {
          ...wedding,
          tasks: updatedTasks,
        };

        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "Task deleted successfully",
          wedding: updatedWedding,
        });
      } catch (error) {
        return Err({ UnauthorizedAction: `Failed to delete task: ${error}` });
      }
    }
  ),

  // Get Task List
  getTaskList: query([text], Result(Vec(Task), Message), (weddingId) => {
    const wedding = weddingStorage.get(weddingId);
    if (!wedding) {
      return Err({ WeddingNotFound: "Wedding not found" });
    }
    return Ok(wedding.tasks);
  }),

  // Get Task Details
  getTaskDetails: query(
    [text, text], // [weddingId, taskId]
    Result(Task, Message),
    (weddingId, taskId) => {
      const wedding = weddingStorage.get(weddingId);
      if (!wedding) {
        return Err({ WeddingNotFound: "Wedding not found" });
      }

      const task = wedding.tasks.find((task) => task.id === taskId);
      if (!task) {
        return Err({ UnauthorizedAction: "Task not found" });
      }

      return Ok(task);
    }
  ),

  /**
   * RegistryItem Management
   */

  // Add Registry Item
  addRegistryItem: update(
    [AddRegistryItemPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
        newRegistryItem: RegistryItem,
      }),
      Message
    ),
    (payload) => {
      try {
        const wedding = weddingStorage.get(payload.weddingId);
        if (!wedding) {
          return Err({ WeddingNotFound: "Wedding not found" });
        }

        const newRegistryItem: RegistryItem = {
          name: payload.name,
          description: payload.description,
          price: payload.price,
          status: "available", // Default status for a new registry item
          purchasedBy: "", // Default empty purchaser
        };

        const updatedWedding: Wedding = {
          ...wedding,
          registry: [...wedding.registry, newRegistryItem],
        };

        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "Registry item added successfully",
          wedding: updatedWedding,
          newRegistryItem,
        });
      } catch (error) {
        return Err({
          UnauthorizedAction: `Failed to add registry item: ${error}`,
        });
      }
    }
  ),

  // Update Registry Item Status (e.g., purchased)
  updateRegistryItemStatus: update(
    [UpdateRegistryItemStatusPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
        updatedRegistryItem: RegistryItem,
      }),
      Message
    ),
    (payload) => {
      try {
        const wedding = weddingStorage.get(payload.weddingId);
        if (!wedding) {
          return Err({ WeddingNotFound: "Wedding not found" });
        }

        const itemIndex = wedding.registry.findIndex(
          (item) => item.name === payload.itemName
        );
        if (itemIndex === -1) {
          return Err({ UnauthorizedAction: "Registry item not found" });
        }

        const updatedRegistryItem: RegistryItem = {
          ...wedding.registry[itemIndex],
          status: payload.status,
          purchasedBy: payload.purchasedBy || "",
        };

        const updatedWedding: Wedding = {
          ...wedding,
          registry: [
            ...wedding.registry.slice(0, itemIndex),
            updatedRegistryItem,
            ...wedding.registry.slice(itemIndex + 1),
          ],
        };

        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "Registry item status updated successfully",
          wedding: updatedWedding,
          updatedRegistryItem,
        });
      } catch (error) {
        return Err({
          UnauthorizedAction: `Failed to update registry item status: ${error}`,
        });
      }
    }
  ),

  // Delete Registry Item
  deleteRegistryItem: update(
    [DeleteRegistryItemPayload],
    Result(
      Record({
        message: text,
        wedding: Wedding,
      }),
      Message
    ),
    (payload) => {
      try {
        const wedding = weddingStorage.get(payload.weddingId);
        if (!wedding) {
          return Err({ WeddingNotFound: "Wedding not found" });
        }

        const updatedRegistry = wedding.registry.filter(
          (item) => item.name !== payload.itemName
        );
        if (updatedRegistry.length === wedding.registry.length) {
          return Err({ UnauthorizedAction: "Registry item not found" });
        }

        const updatedWedding: Wedding = {
          ...wedding,
          registry: updatedRegistry,
        };

        weddingStorage.insert(payload.weddingId, updatedWedding);

        return Ok({
          message: "Registry item deleted successfully",
          wedding: updatedWedding,
        });
      } catch (error) {
        return Err({
          UnauthorizedAction: `Failed to delete registry item: ${error}`,
        });
      }
    }
  ),

  // Get Registry Items
  getRegistryItems: query(
    [text],
    Result(Vec(RegistryItem), Message),
    (weddingId) => {
      const wedding = weddingStorage.get(weddingId);
      if (!wedding) {
        return Err({ WeddingNotFound: "Wedding not found" });
      }
      return Ok(wedding.registry);
    }
  ),

  // Get Registry Item Details
  getRegistryItemDetails: query(
    [text, text], // [weddingId, itemName]
    Result(RegistryItem, Message),
    (weddingId, itemName) => {
      const wedding = weddingStorage.get(weddingId);
      if (!wedding) {
        return Err({ WeddingNotFound: "Wedding not found" });
      }

      const registryItem = wedding.registry.find(
        (item) => item.name === itemName
      );
      if (!registryItem) {
        return Err({ UnauthorizedAction: "Registry item not found" });
      }

      return Ok(registryItem);
    }
  ),
});
