import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'addTimelineItem' : ActorMethod<
    [
      {
        'status' : string,
        'time' : string,
        'description' : string,
        'responsible' : string,
        'weddingId' : string,
      },
    ],
    {
        'Ok' : {
          'wedding' : {
            'id' : string,
            'status' : string,
            'tasks' : Array<
              {
                'id' : string,
                'status' : string,
                'title' : string,
                'assignedTo' : string,
                'description' : string,
                'deadline' : string,
                'budget' : bigint,
              }
            >,
            'vendors' : Array<
              {
                'status' : string,
                'additionalDetails' : [] | [string],
                'weddingOffer' : bigint,
                'date' : string,
                'weddingId' : string,
                'vendorId' : string,
              }
            >,
            'date' : string,
            'guestCount' : bigint,
            'guestList' : Array<
              {
                'plusOne' : boolean,
                'rsvpStatus' : string,
                'name' : string,
                'guestEmail' : string,
                'dietaryRestrictions' : string,
                'tableAssignment' : { 'familyTable' : string } |
                  { 'Table10' : string } |
                  { 'unassigned' : string } |
                  { 'VIPTable' : string } |
                  { 'Table1' : string } |
                  { 'Table2' : string } |
                  { 'Table3' : string } |
                  { 'Table4' : string } |
                  { 'Table5' : string } |
                  { 'Table6' : string } |
                  { 'Table7' : string } |
                  { 'Table8' : string } |
                  { 'Table9' : string },
              }
            >,
            'coupleNames' : Array<string>,
            'budget' : bigint,
            'registry' : Array<
              {
                'status' : string,
                'name' : string,
                'description' : string,
                'purchasedBy' : string,
                'price' : bigint,
              }
            >,
            'location' : string,
            'timeline' : Array<
              {
                'status' : string,
                'time' : string,
                'description' : string,
                'responsible' : string,
                'weddingId' : string,
              }
            >,
          },
          'message' : string,
        }
      } |
      {
        'Err' : { 'WeddingNotFound' : string } |
          { 'VendorNotFound' : string } |
          { 'InvalidDate' : string } |
          { 'DateUnavailable' : string } |
          { 'UnauthorizedAction' : string } |
          { 'BudgetExceeded' : string }
      }
  >,
  'approveGuestRSVP' : ActorMethod<
    [
      {
        'guestEmail' : string,
        'weddingId' : string,
        'tableAssignment' : { 'familyTable' : string } |
          { 'Table10' : string } |
          { 'unassigned' : string } |
          { 'VIPTable' : string } |
          { 'Table1' : string } |
          { 'Table2' : string } |
          { 'Table3' : string } |
          { 'Table4' : string } |
          { 'Table5' : string } |
          { 'Table6' : string } |
          { 'Table7' : string } |
          { 'Table8' : string } |
          { 'Table9' : string },
      },
    ],
    {
        'Ok' : {
          'wedding' : {
            'id' : string,
            'status' : string,
            'tasks' : Array<
              {
                'id' : string,
                'status' : string,
                'title' : string,
                'assignedTo' : string,
                'description' : string,
                'deadline' : string,
                'budget' : bigint,
              }
            >,
            'vendors' : Array<
              {
                'status' : string,
                'additionalDetails' : [] | [string],
                'weddingOffer' : bigint,
                'date' : string,
                'weddingId' : string,
                'vendorId' : string,
              }
            >,
            'date' : string,
            'guestCount' : bigint,
            'guestList' : Array<
              {
                'plusOne' : boolean,
                'rsvpStatus' : string,
                'name' : string,
                'guestEmail' : string,
                'dietaryRestrictions' : string,
                'tableAssignment' : { 'familyTable' : string } |
                  { 'Table10' : string } |
                  { 'unassigned' : string } |
                  { 'VIPTable' : string } |
                  { 'Table1' : string } |
                  { 'Table2' : string } |
                  { 'Table3' : string } |
                  { 'Table4' : string } |
                  { 'Table5' : string } |
                  { 'Table6' : string } |
                  { 'Table7' : string } |
                  { 'Table8' : string } |
                  { 'Table9' : string },
              }
            >,
            'coupleNames' : Array<string>,
            'budget' : bigint,
            'registry' : Array<
              {
                'status' : string,
                'name' : string,
                'description' : string,
                'purchasedBy' : string,
                'price' : bigint,
              }
            >,
            'location' : string,
            'timeline' : Array<
              {
                'status' : string,
                'time' : string,
                'description' : string,
                'responsible' : string,
                'weddingId' : string,
              }
            >,
          },
          'message' : string,
          'updatedGuest' : {
            'plusOne' : boolean,
            'rsvpStatus' : string,
            'name' : string,
            'guestEmail' : string,
            'dietaryRestrictions' : string,
            'tableAssignment' : { 'familyTable' : string } |
              { 'Table10' : string } |
              { 'unassigned' : string } |
              { 'VIPTable' : string } |
              { 'Table1' : string } |
              { 'Table2' : string } |
              { 'Table3' : string } |
              { 'Table4' : string } |
              { 'Table5' : string } |
              { 'Table6' : string } |
              { 'Table7' : string } |
              { 'Table8' : string } |
              { 'Table9' : string },
          },
        }
      } |
      {
        'Err' : { 'WeddingNotFound' : string } |
          { 'VendorNotFound' : string } |
          { 'InvalidDate' : string } |
          { 'DateUnavailable' : string } |
          { 'UnauthorizedAction' : string } |
          { 'BudgetExceeded' : string }
      }
  >,
  'bookVendor' : ActorMethod<
    [
      {
        'additionalDetails' : [] | [string],
        'weddingOffer' : bigint,
        'weddingId' : string,
        'vendorId' : string,
      },
    ],
    {
        'Ok' : {
          'booking' : {
            'status' : string,
            'additionalDetails' : [] | [string],
            'weddingOffer' : bigint,
            'date' : string,
            'weddingId' : string,
            'vendorId' : string,
          },
          'wedding' : {
            'id' : string,
            'status' : string,
            'tasks' : Array<
              {
                'id' : string,
                'status' : string,
                'title' : string,
                'assignedTo' : string,
                'description' : string,
                'deadline' : string,
                'budget' : bigint,
              }
            >,
            'vendors' : Array<
              {
                'status' : string,
                'additionalDetails' : [] | [string],
                'weddingOffer' : bigint,
                'date' : string,
                'weddingId' : string,
                'vendorId' : string,
              }
            >,
            'date' : string,
            'guestCount' : bigint,
            'guestList' : Array<
              {
                'plusOne' : boolean,
                'rsvpStatus' : string,
                'name' : string,
                'guestEmail' : string,
                'dietaryRestrictions' : string,
                'tableAssignment' : { 'familyTable' : string } |
                  { 'Table10' : string } |
                  { 'unassigned' : string } |
                  { 'VIPTable' : string } |
                  { 'Table1' : string } |
                  { 'Table2' : string } |
                  { 'Table3' : string } |
                  { 'Table4' : string } |
                  { 'Table5' : string } |
                  { 'Table6' : string } |
                  { 'Table7' : string } |
                  { 'Table8' : string } |
                  { 'Table9' : string },
              }
            >,
            'coupleNames' : Array<string>,
            'budget' : bigint,
            'registry' : Array<
              {
                'status' : string,
                'name' : string,
                'description' : string,
                'purchasedBy' : string,
                'price' : bigint,
              }
            >,
            'location' : string,
            'timeline' : Array<
              {
                'status' : string,
                'time' : string,
                'description' : string,
                'responsible' : string,
                'weddingId' : string,
              }
            >,
          },
          'message' : string,
          'vendor' : {
            'id' : string,
            'portfolio' : Array<string>,
            'serviceCost' : bigint,
            'verified' : boolean,
            'reviews' : Array<
              {
                'date' : bigint,
                'author' : Principal,
                'comment' : string,
                'rating' : bigint,
              }
            >,
            'bookings' : Array<Principal>,
            'owner' : Principal,
            'name' : string,
            'description' : string,
            'availability' : Array<string>,
            'category' : { 'Attire' : string } |
              { 'Favors' : string } |
              { 'Cake' : string } |
              { 'Decor' : string } |
              { 'Catering' : string } |
              { 'Stationery' : string } |
              { 'Music' : string } |
              { 'Venue' : string } |
              { 'Other' : string } |
              { 'Beauty' : string } |
              { 'Planning' : string } |
              { 'Photography' : string } |
              { 'Transport' : string },
            'rating' : bigint,
          },
        }
      } |
      {
        'Err' : { 'WeddingNotFound' : string } |
          { 'VendorNotFound' : string } |
          { 'InvalidDate' : string } |
          { 'DateUnavailable' : string } |
          { 'UnauthorizedAction' : string } |
          { 'BudgetExceeded' : string }
      }
  >,
  'createWedding' : ActorMethod<
    [
      {
        'date' : string,
        'guestCount' : bigint,
        'coupleNames' : Array<string>,
        'budget' : bigint,
        'location' : string,
      },
    ],
    {
        'Ok' : {
          'wedding' : {
            'id' : string,
            'status' : string,
            'tasks' : Array<
              {
                'id' : string,
                'status' : string,
                'title' : string,
                'assignedTo' : string,
                'description' : string,
                'deadline' : string,
                'budget' : bigint,
              }
            >,
            'vendors' : Array<
              {
                'status' : string,
                'additionalDetails' : [] | [string],
                'weddingOffer' : bigint,
                'date' : string,
                'weddingId' : string,
                'vendorId' : string,
              }
            >,
            'date' : string,
            'guestCount' : bigint,
            'guestList' : Array<
              {
                'plusOne' : boolean,
                'rsvpStatus' : string,
                'name' : string,
                'guestEmail' : string,
                'dietaryRestrictions' : string,
                'tableAssignment' : { 'familyTable' : string } |
                  { 'Table10' : string } |
                  { 'unassigned' : string } |
                  { 'VIPTable' : string } |
                  { 'Table1' : string } |
                  { 'Table2' : string } |
                  { 'Table3' : string } |
                  { 'Table4' : string } |
                  { 'Table5' : string } |
                  { 'Table6' : string } |
                  { 'Table7' : string } |
                  { 'Table8' : string } |
                  { 'Table9' : string },
              }
            >,
            'coupleNames' : Array<string>,
            'budget' : bigint,
            'registry' : Array<
              {
                'status' : string,
                'name' : string,
                'description' : string,
                'purchasedBy' : string,
                'price' : bigint,
              }
            >,
            'location' : string,
            'timeline' : Array<
              {
                'status' : string,
                'time' : string,
                'description' : string,
                'responsible' : string,
                'weddingId' : string,
              }
            >,
          },
          'message' : string,
        }
      } |
      {
        'Err' : { 'WeddingNotFound' : string } |
          { 'VendorNotFound' : string } |
          { 'InvalidDate' : string } |
          { 'DateUnavailable' : string } |
          { 'UnauthorizedAction' : string } |
          { 'BudgetExceeded' : string }
      }
  >,
  'getVendorDetails' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'portfolio' : Array<string>,
          'serviceCost' : bigint,
          'verified' : boolean,
          'reviews' : Array<
            {
              'date' : bigint,
              'author' : Principal,
              'comment' : string,
              'rating' : bigint,
            }
          >,
          'bookings' : Array<Principal>,
          'owner' : Principal,
          'name' : string,
          'description' : string,
          'availability' : Array<string>,
          'category' : { 'Attire' : string } |
            { 'Favors' : string } |
            { 'Cake' : string } |
            { 'Decor' : string } |
            { 'Catering' : string } |
            { 'Stationery' : string } |
            { 'Music' : string } |
            { 'Venue' : string } |
            { 'Other' : string } |
            { 'Beauty' : string } |
            { 'Planning' : string } |
            { 'Photography' : string } |
            { 'Transport' : string },
          'rating' : bigint,
        }
      } |
      {
        'Err' : { 'WeddingNotFound' : string } |
          { 'VendorNotFound' : string } |
          { 'InvalidDate' : string } |
          { 'DateUnavailable' : string } |
          { 'UnauthorizedAction' : string } |
          { 'BudgetExceeded' : string }
      }
  >,
  'getWeddingDetails' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'status' : string,
          'tasks' : Array<
            {
              'id' : string,
              'status' : string,
              'title' : string,
              'assignedTo' : string,
              'description' : string,
              'deadline' : string,
              'budget' : bigint,
            }
          >,
          'vendors' : Array<
            {
              'status' : string,
              'additionalDetails' : [] | [string],
              'weddingOffer' : bigint,
              'date' : string,
              'weddingId' : string,
              'vendorId' : string,
            }
          >,
          'date' : string,
          'guestCount' : bigint,
          'guestList' : Array<
            {
              'plusOne' : boolean,
              'rsvpStatus' : string,
              'name' : string,
              'guestEmail' : string,
              'dietaryRestrictions' : string,
              'tableAssignment' : { 'familyTable' : string } |
                { 'Table10' : string } |
                { 'unassigned' : string } |
                { 'VIPTable' : string } |
                { 'Table1' : string } |
                { 'Table2' : string } |
                { 'Table3' : string } |
                { 'Table4' : string } |
                { 'Table5' : string } |
                { 'Table6' : string } |
                { 'Table7' : string } |
                { 'Table8' : string } |
                { 'Table9' : string },
            }
          >,
          'coupleNames' : Array<string>,
          'budget' : bigint,
          'registry' : Array<
            {
              'status' : string,
              'name' : string,
              'description' : string,
              'purchasedBy' : string,
              'price' : bigint,
            }
          >,
          'location' : string,
          'timeline' : Array<
            {
              'status' : string,
              'time' : string,
              'description' : string,
              'responsible' : string,
              'weddingId' : string,
            }
          >,
        }
      } |
      {
        'Err' : { 'WeddingNotFound' : string } |
          { 'VendorNotFound' : string } |
          { 'InvalidDate' : string } |
          { 'DateUnavailable' : string } |
          { 'UnauthorizedAction' : string } |
          { 'BudgetExceeded' : string }
      }
  >,
  'registerVendor' : ActorMethod<
    [
      {
        'portfolio' : Array<string>,
        'serviceCost' : bigint,
        'name' : string,
        'description' : string,
        'availability' : Array<string>,
        'category' : { 'Attire' : string } |
          { 'Favors' : string } |
          { 'Cake' : string } |
          { 'Decor' : string } |
          { 'Catering' : string } |
          { 'Stationery' : string } |
          { 'Music' : string } |
          { 'Venue' : string } |
          { 'Other' : string } |
          { 'Beauty' : string } |
          { 'Planning' : string } |
          { 'Photography' : string } |
          { 'Transport' : string },
      },
    ],
    {
        'Ok' : {
          'message' : string,
          'vendor' : {
            'id' : string,
            'portfolio' : Array<string>,
            'serviceCost' : bigint,
            'verified' : boolean,
            'reviews' : Array<
              {
                'date' : bigint,
                'author' : Principal,
                'comment' : string,
                'rating' : bigint,
              }
            >,
            'bookings' : Array<Principal>,
            'owner' : Principal,
            'name' : string,
            'description' : string,
            'availability' : Array<string>,
            'category' : { 'Attire' : string } |
              { 'Favors' : string } |
              { 'Cake' : string } |
              { 'Decor' : string } |
              { 'Catering' : string } |
              { 'Stationery' : string } |
              { 'Music' : string } |
              { 'Venue' : string } |
              { 'Other' : string } |
              { 'Beauty' : string } |
              { 'Planning' : string } |
              { 'Photography' : string } |
              { 'Transport' : string },
            'rating' : bigint,
          },
        }
      } |
      {
        'Err' : { 'WeddingNotFound' : string } |
          { 'VendorNotFound' : string } |
          { 'InvalidDate' : string } |
          { 'DateUnavailable' : string } |
          { 'UnauthorizedAction' : string } |
          { 'BudgetExceeded' : string }
      }
  >,
  'searchVendors' : ActorMethod<
    [string],
    Array<
      {
        'id' : string,
        'portfolio' : Array<string>,
        'serviceCost' : bigint,
        'verified' : boolean,
        'reviews' : Array<
          {
            'date' : bigint,
            'author' : Principal,
            'comment' : string,
            'rating' : bigint,
          }
        >,
        'bookings' : Array<Principal>,
        'owner' : Principal,
        'name' : string,
        'description' : string,
        'availability' : Array<string>,
        'category' : { 'Attire' : string } |
          { 'Favors' : string } |
          { 'Cake' : string } |
          { 'Decor' : string } |
          { 'Catering' : string } |
          { 'Stationery' : string } |
          { 'Music' : string } |
          { 'Venue' : string } |
          { 'Other' : string } |
          { 'Beauty' : string } |
          { 'Planning' : string } |
          { 'Photography' : string } |
          { 'Transport' : string },
        'rating' : bigint,
      }
    >
  >,
  'submitGuestRSVP' : ActorMethod<
    [
      {
        'plusOne' : boolean,
        'name' : string,
        'guestEmail' : string,
        'dietaryRestrictions' : string,
        'weddingId' : string,
        'tableAssignment' : string,
      },
    ],
    {
        'Ok' : {
          'wedding' : {
            'id' : string,
            'status' : string,
            'tasks' : Array<
              {
                'id' : string,
                'status' : string,
                'title' : string,
                'assignedTo' : string,
                'description' : string,
                'deadline' : string,
                'budget' : bigint,
              }
            >,
            'vendors' : Array<
              {
                'status' : string,
                'additionalDetails' : [] | [string],
                'weddingOffer' : bigint,
                'date' : string,
                'weddingId' : string,
                'vendorId' : string,
              }
            >,
            'date' : string,
            'guestCount' : bigint,
            'guestList' : Array<
              {
                'plusOne' : boolean,
                'rsvpStatus' : string,
                'name' : string,
                'guestEmail' : string,
                'dietaryRestrictions' : string,
                'tableAssignment' : { 'familyTable' : string } |
                  { 'Table10' : string } |
                  { 'unassigned' : string } |
                  { 'VIPTable' : string } |
                  { 'Table1' : string } |
                  { 'Table2' : string } |
                  { 'Table3' : string } |
                  { 'Table4' : string } |
                  { 'Table5' : string } |
                  { 'Table6' : string } |
                  { 'Table7' : string } |
                  { 'Table8' : string } |
                  { 'Table9' : string },
              }
            >,
            'coupleNames' : Array<string>,
            'budget' : bigint,
            'registry' : Array<
              {
                'status' : string,
                'name' : string,
                'description' : string,
                'purchasedBy' : string,
                'price' : bigint,
              }
            >,
            'location' : string,
            'timeline' : Array<
              {
                'status' : string,
                'time' : string,
                'description' : string,
                'responsible' : string,
                'weddingId' : string,
              }
            >,
          },
          'message' : string,
          'newGuest' : {
            'plusOne' : boolean,
            'rsvpStatus' : string,
            'name' : string,
            'guestEmail' : string,
            'dietaryRestrictions' : string,
            'tableAssignment' : { 'familyTable' : string } |
              { 'Table10' : string } |
              { 'unassigned' : string } |
              { 'VIPTable' : string } |
              { 'Table1' : string } |
              { 'Table2' : string } |
              { 'Table3' : string } |
              { 'Table4' : string } |
              { 'Table5' : string } |
              { 'Table6' : string } |
              { 'Table7' : string } |
              { 'Table8' : string } |
              { 'Table9' : string },
          },
        }
      } |
      {
        'Err' : { 'WeddingNotFound' : string } |
          { 'VendorNotFound' : string } |
          { 'InvalidDate' : string } |
          { 'DateUnavailable' : string } |
          { 'UnauthorizedAction' : string } |
          { 'BudgetExceeded' : string }
      }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
