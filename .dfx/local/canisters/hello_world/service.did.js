export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addTimelineItem' : IDL.Func(
        [
          IDL.Record({
            'status' : IDL.Text,
            'time' : IDL.Text,
            'description' : IDL.Text,
            'responsible' : IDL.Text,
            'weddingId' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'wedding' : IDL.Record({
                'id' : IDL.Text,
                'status' : IDL.Text,
                'tasks' : IDL.Vec(
                  IDL.Record({
                    'id' : IDL.Text,
                    'status' : IDL.Text,
                    'title' : IDL.Text,
                    'assignedTo' : IDL.Text,
                    'description' : IDL.Text,
                    'deadline' : IDL.Text,
                    'budget' : IDL.Nat64,
                  })
                ),
                'vendors' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'additionalDetails' : IDL.Opt(IDL.Text),
                    'weddingOffer' : IDL.Nat64,
                    'date' : IDL.Text,
                    'weddingId' : IDL.Text,
                    'vendorId' : IDL.Text,
                  })
                ),
                'date' : IDL.Text,
                'guestCount' : IDL.Nat64,
                'guestList' : IDL.Vec(
                  IDL.Record({
                    'plusOne' : IDL.Bool,
                    'rsvpStatus' : IDL.Text,
                    'name' : IDL.Text,
                    'guestEmail' : IDL.Text,
                    'dietaryRestrictions' : IDL.Text,
                    'tableAssignment' : IDL.Variant({
                      'familyTable' : IDL.Text,
                      'Table10' : IDL.Text,
                      'unassigned' : IDL.Text,
                      'VIPTable' : IDL.Text,
                      'Table1' : IDL.Text,
                      'Table2' : IDL.Text,
                      'Table3' : IDL.Text,
                      'Table4' : IDL.Text,
                      'Table5' : IDL.Text,
                      'Table6' : IDL.Text,
                      'Table7' : IDL.Text,
                      'Table8' : IDL.Text,
                      'Table9' : IDL.Text,
                    }),
                  })
                ),
                'coupleNames' : IDL.Vec(IDL.Text),
                'budget' : IDL.Nat64,
                'registry' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'name' : IDL.Text,
                    'description' : IDL.Text,
                    'purchasedBy' : IDL.Text,
                    'price' : IDL.Nat64,
                  })
                ),
                'location' : IDL.Text,
                'timeline' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'time' : IDL.Text,
                    'description' : IDL.Text,
                    'responsible' : IDL.Text,
                    'weddingId' : IDL.Text,
                  })
                ),
              }),
              'message' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'WeddingNotFound' : IDL.Text,
              'VendorNotFound' : IDL.Text,
              'InvalidDate' : IDL.Text,
              'DateUnavailable' : IDL.Text,
              'UnauthorizedAction' : IDL.Text,
              'BudgetExceeded' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'approveGuestRSVP' : IDL.Func(
        [
          IDL.Record({
            'guestEmail' : IDL.Text,
            'weddingId' : IDL.Text,
            'tableAssignment' : IDL.Variant({
              'familyTable' : IDL.Text,
              'Table10' : IDL.Text,
              'unassigned' : IDL.Text,
              'VIPTable' : IDL.Text,
              'Table1' : IDL.Text,
              'Table2' : IDL.Text,
              'Table3' : IDL.Text,
              'Table4' : IDL.Text,
              'Table5' : IDL.Text,
              'Table6' : IDL.Text,
              'Table7' : IDL.Text,
              'Table8' : IDL.Text,
              'Table9' : IDL.Text,
            }),
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'wedding' : IDL.Record({
                'id' : IDL.Text,
                'status' : IDL.Text,
                'tasks' : IDL.Vec(
                  IDL.Record({
                    'id' : IDL.Text,
                    'status' : IDL.Text,
                    'title' : IDL.Text,
                    'assignedTo' : IDL.Text,
                    'description' : IDL.Text,
                    'deadline' : IDL.Text,
                    'budget' : IDL.Nat64,
                  })
                ),
                'vendors' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'additionalDetails' : IDL.Opt(IDL.Text),
                    'weddingOffer' : IDL.Nat64,
                    'date' : IDL.Text,
                    'weddingId' : IDL.Text,
                    'vendorId' : IDL.Text,
                  })
                ),
                'date' : IDL.Text,
                'guestCount' : IDL.Nat64,
                'guestList' : IDL.Vec(
                  IDL.Record({
                    'plusOne' : IDL.Bool,
                    'rsvpStatus' : IDL.Text,
                    'name' : IDL.Text,
                    'guestEmail' : IDL.Text,
                    'dietaryRestrictions' : IDL.Text,
                    'tableAssignment' : IDL.Variant({
                      'familyTable' : IDL.Text,
                      'Table10' : IDL.Text,
                      'unassigned' : IDL.Text,
                      'VIPTable' : IDL.Text,
                      'Table1' : IDL.Text,
                      'Table2' : IDL.Text,
                      'Table3' : IDL.Text,
                      'Table4' : IDL.Text,
                      'Table5' : IDL.Text,
                      'Table6' : IDL.Text,
                      'Table7' : IDL.Text,
                      'Table8' : IDL.Text,
                      'Table9' : IDL.Text,
                    }),
                  })
                ),
                'coupleNames' : IDL.Vec(IDL.Text),
                'budget' : IDL.Nat64,
                'registry' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'name' : IDL.Text,
                    'description' : IDL.Text,
                    'purchasedBy' : IDL.Text,
                    'price' : IDL.Nat64,
                  })
                ),
                'location' : IDL.Text,
                'timeline' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'time' : IDL.Text,
                    'description' : IDL.Text,
                    'responsible' : IDL.Text,
                    'weddingId' : IDL.Text,
                  })
                ),
              }),
              'message' : IDL.Text,
              'updatedGuest' : IDL.Record({
                'plusOne' : IDL.Bool,
                'rsvpStatus' : IDL.Text,
                'name' : IDL.Text,
                'guestEmail' : IDL.Text,
                'dietaryRestrictions' : IDL.Text,
                'tableAssignment' : IDL.Variant({
                  'familyTable' : IDL.Text,
                  'Table10' : IDL.Text,
                  'unassigned' : IDL.Text,
                  'VIPTable' : IDL.Text,
                  'Table1' : IDL.Text,
                  'Table2' : IDL.Text,
                  'Table3' : IDL.Text,
                  'Table4' : IDL.Text,
                  'Table5' : IDL.Text,
                  'Table6' : IDL.Text,
                  'Table7' : IDL.Text,
                  'Table8' : IDL.Text,
                  'Table9' : IDL.Text,
                }),
              }),
            }),
            'Err' : IDL.Variant({
              'WeddingNotFound' : IDL.Text,
              'VendorNotFound' : IDL.Text,
              'InvalidDate' : IDL.Text,
              'DateUnavailable' : IDL.Text,
              'UnauthorizedAction' : IDL.Text,
              'BudgetExceeded' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'bookVendor' : IDL.Func(
        [
          IDL.Record({
            'additionalDetails' : IDL.Opt(IDL.Text),
            'weddingOffer' : IDL.Nat64,
            'weddingId' : IDL.Text,
            'vendorId' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'booking' : IDL.Record({
                'status' : IDL.Text,
                'additionalDetails' : IDL.Opt(IDL.Text),
                'weddingOffer' : IDL.Nat64,
                'date' : IDL.Text,
                'weddingId' : IDL.Text,
                'vendorId' : IDL.Text,
              }),
              'wedding' : IDL.Record({
                'id' : IDL.Text,
                'status' : IDL.Text,
                'tasks' : IDL.Vec(
                  IDL.Record({
                    'id' : IDL.Text,
                    'status' : IDL.Text,
                    'title' : IDL.Text,
                    'assignedTo' : IDL.Text,
                    'description' : IDL.Text,
                    'deadline' : IDL.Text,
                    'budget' : IDL.Nat64,
                  })
                ),
                'vendors' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'additionalDetails' : IDL.Opt(IDL.Text),
                    'weddingOffer' : IDL.Nat64,
                    'date' : IDL.Text,
                    'weddingId' : IDL.Text,
                    'vendorId' : IDL.Text,
                  })
                ),
                'date' : IDL.Text,
                'guestCount' : IDL.Nat64,
                'guestList' : IDL.Vec(
                  IDL.Record({
                    'plusOne' : IDL.Bool,
                    'rsvpStatus' : IDL.Text,
                    'name' : IDL.Text,
                    'guestEmail' : IDL.Text,
                    'dietaryRestrictions' : IDL.Text,
                    'tableAssignment' : IDL.Variant({
                      'familyTable' : IDL.Text,
                      'Table10' : IDL.Text,
                      'unassigned' : IDL.Text,
                      'VIPTable' : IDL.Text,
                      'Table1' : IDL.Text,
                      'Table2' : IDL.Text,
                      'Table3' : IDL.Text,
                      'Table4' : IDL.Text,
                      'Table5' : IDL.Text,
                      'Table6' : IDL.Text,
                      'Table7' : IDL.Text,
                      'Table8' : IDL.Text,
                      'Table9' : IDL.Text,
                    }),
                  })
                ),
                'coupleNames' : IDL.Vec(IDL.Text),
                'budget' : IDL.Nat64,
                'registry' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'name' : IDL.Text,
                    'description' : IDL.Text,
                    'purchasedBy' : IDL.Text,
                    'price' : IDL.Nat64,
                  })
                ),
                'location' : IDL.Text,
                'timeline' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'time' : IDL.Text,
                    'description' : IDL.Text,
                    'responsible' : IDL.Text,
                    'weddingId' : IDL.Text,
                  })
                ),
              }),
              'message' : IDL.Text,
              'vendor' : IDL.Record({
                'id' : IDL.Text,
                'portfolio' : IDL.Vec(IDL.Text),
                'serviceCost' : IDL.Nat64,
                'verified' : IDL.Bool,
                'reviews' : IDL.Vec(
                  IDL.Record({
                    'date' : IDL.Nat64,
                    'author' : IDL.Principal,
                    'comment' : IDL.Text,
                    'rating' : IDL.Nat64,
                  })
                ),
                'bookings' : IDL.Vec(IDL.Principal),
                'owner' : IDL.Principal,
                'name' : IDL.Text,
                'description' : IDL.Text,
                'availability' : IDL.Vec(IDL.Text),
                'category' : IDL.Variant({
                  'Attire' : IDL.Text,
                  'Favors' : IDL.Text,
                  'Cake' : IDL.Text,
                  'Decor' : IDL.Text,
                  'Catering' : IDL.Text,
                  'Stationery' : IDL.Text,
                  'Music' : IDL.Text,
                  'Venue' : IDL.Text,
                  'Other' : IDL.Text,
                  'Beauty' : IDL.Text,
                  'Planning' : IDL.Text,
                  'Photography' : IDL.Text,
                  'Transport' : IDL.Text,
                }),
                'rating' : IDL.Nat64,
              }),
            }),
            'Err' : IDL.Variant({
              'WeddingNotFound' : IDL.Text,
              'VendorNotFound' : IDL.Text,
              'InvalidDate' : IDL.Text,
              'DateUnavailable' : IDL.Text,
              'UnauthorizedAction' : IDL.Text,
              'BudgetExceeded' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'createWedding' : IDL.Func(
        [
          IDL.Record({
            'date' : IDL.Text,
            'guestCount' : IDL.Nat64,
            'coupleNames' : IDL.Vec(IDL.Text),
            'budget' : IDL.Nat64,
            'location' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'wedding' : IDL.Record({
                'id' : IDL.Text,
                'status' : IDL.Text,
                'tasks' : IDL.Vec(
                  IDL.Record({
                    'id' : IDL.Text,
                    'status' : IDL.Text,
                    'title' : IDL.Text,
                    'assignedTo' : IDL.Text,
                    'description' : IDL.Text,
                    'deadline' : IDL.Text,
                    'budget' : IDL.Nat64,
                  })
                ),
                'vendors' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'additionalDetails' : IDL.Opt(IDL.Text),
                    'weddingOffer' : IDL.Nat64,
                    'date' : IDL.Text,
                    'weddingId' : IDL.Text,
                    'vendorId' : IDL.Text,
                  })
                ),
                'date' : IDL.Text,
                'guestCount' : IDL.Nat64,
                'guestList' : IDL.Vec(
                  IDL.Record({
                    'plusOne' : IDL.Bool,
                    'rsvpStatus' : IDL.Text,
                    'name' : IDL.Text,
                    'guestEmail' : IDL.Text,
                    'dietaryRestrictions' : IDL.Text,
                    'tableAssignment' : IDL.Variant({
                      'familyTable' : IDL.Text,
                      'Table10' : IDL.Text,
                      'unassigned' : IDL.Text,
                      'VIPTable' : IDL.Text,
                      'Table1' : IDL.Text,
                      'Table2' : IDL.Text,
                      'Table3' : IDL.Text,
                      'Table4' : IDL.Text,
                      'Table5' : IDL.Text,
                      'Table6' : IDL.Text,
                      'Table7' : IDL.Text,
                      'Table8' : IDL.Text,
                      'Table9' : IDL.Text,
                    }),
                  })
                ),
                'coupleNames' : IDL.Vec(IDL.Text),
                'budget' : IDL.Nat64,
                'registry' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'name' : IDL.Text,
                    'description' : IDL.Text,
                    'purchasedBy' : IDL.Text,
                    'price' : IDL.Nat64,
                  })
                ),
                'location' : IDL.Text,
                'timeline' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'time' : IDL.Text,
                    'description' : IDL.Text,
                    'responsible' : IDL.Text,
                    'weddingId' : IDL.Text,
                  })
                ),
              }),
              'message' : IDL.Text,
            }),
            'Err' : IDL.Variant({
              'WeddingNotFound' : IDL.Text,
              'VendorNotFound' : IDL.Text,
              'InvalidDate' : IDL.Text,
              'DateUnavailable' : IDL.Text,
              'UnauthorizedAction' : IDL.Text,
              'BudgetExceeded' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'getVendorDetails' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'portfolio' : IDL.Vec(IDL.Text),
              'serviceCost' : IDL.Nat64,
              'verified' : IDL.Bool,
              'reviews' : IDL.Vec(
                IDL.Record({
                  'date' : IDL.Nat64,
                  'author' : IDL.Principal,
                  'comment' : IDL.Text,
                  'rating' : IDL.Nat64,
                })
              ),
              'bookings' : IDL.Vec(IDL.Principal),
              'owner' : IDL.Principal,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'availability' : IDL.Vec(IDL.Text),
              'category' : IDL.Variant({
                'Attire' : IDL.Text,
                'Favors' : IDL.Text,
                'Cake' : IDL.Text,
                'Decor' : IDL.Text,
                'Catering' : IDL.Text,
                'Stationery' : IDL.Text,
                'Music' : IDL.Text,
                'Venue' : IDL.Text,
                'Other' : IDL.Text,
                'Beauty' : IDL.Text,
                'Planning' : IDL.Text,
                'Photography' : IDL.Text,
                'Transport' : IDL.Text,
              }),
              'rating' : IDL.Nat64,
            }),
            'Err' : IDL.Variant({
              'WeddingNotFound' : IDL.Text,
              'VendorNotFound' : IDL.Text,
              'InvalidDate' : IDL.Text,
              'DateUnavailable' : IDL.Text,
              'UnauthorizedAction' : IDL.Text,
              'BudgetExceeded' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'getWeddingDetails' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'status' : IDL.Text,
              'tasks' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Text,
                  'status' : IDL.Text,
                  'title' : IDL.Text,
                  'assignedTo' : IDL.Text,
                  'description' : IDL.Text,
                  'deadline' : IDL.Text,
                  'budget' : IDL.Nat64,
                })
              ),
              'vendors' : IDL.Vec(
                IDL.Record({
                  'status' : IDL.Text,
                  'additionalDetails' : IDL.Opt(IDL.Text),
                  'weddingOffer' : IDL.Nat64,
                  'date' : IDL.Text,
                  'weddingId' : IDL.Text,
                  'vendorId' : IDL.Text,
                })
              ),
              'date' : IDL.Text,
              'guestCount' : IDL.Nat64,
              'guestList' : IDL.Vec(
                IDL.Record({
                  'plusOne' : IDL.Bool,
                  'rsvpStatus' : IDL.Text,
                  'name' : IDL.Text,
                  'guestEmail' : IDL.Text,
                  'dietaryRestrictions' : IDL.Text,
                  'tableAssignment' : IDL.Variant({
                    'familyTable' : IDL.Text,
                    'Table10' : IDL.Text,
                    'unassigned' : IDL.Text,
                    'VIPTable' : IDL.Text,
                    'Table1' : IDL.Text,
                    'Table2' : IDL.Text,
                    'Table3' : IDL.Text,
                    'Table4' : IDL.Text,
                    'Table5' : IDL.Text,
                    'Table6' : IDL.Text,
                    'Table7' : IDL.Text,
                    'Table8' : IDL.Text,
                    'Table9' : IDL.Text,
                  }),
                })
              ),
              'coupleNames' : IDL.Vec(IDL.Text),
              'budget' : IDL.Nat64,
              'registry' : IDL.Vec(
                IDL.Record({
                  'status' : IDL.Text,
                  'name' : IDL.Text,
                  'description' : IDL.Text,
                  'purchasedBy' : IDL.Text,
                  'price' : IDL.Nat64,
                })
              ),
              'location' : IDL.Text,
              'timeline' : IDL.Vec(
                IDL.Record({
                  'status' : IDL.Text,
                  'time' : IDL.Text,
                  'description' : IDL.Text,
                  'responsible' : IDL.Text,
                  'weddingId' : IDL.Text,
                })
              ),
            }),
            'Err' : IDL.Variant({
              'WeddingNotFound' : IDL.Text,
              'VendorNotFound' : IDL.Text,
              'InvalidDate' : IDL.Text,
              'DateUnavailable' : IDL.Text,
              'UnauthorizedAction' : IDL.Text,
              'BudgetExceeded' : IDL.Text,
            }),
          }),
        ],
        ['query'],
      ),
    'registerVendor' : IDL.Func(
        [
          IDL.Record({
            'portfolio' : IDL.Vec(IDL.Text),
            'serviceCost' : IDL.Nat64,
            'name' : IDL.Text,
            'description' : IDL.Text,
            'availability' : IDL.Vec(IDL.Text),
            'category' : IDL.Variant({
              'Attire' : IDL.Text,
              'Favors' : IDL.Text,
              'Cake' : IDL.Text,
              'Decor' : IDL.Text,
              'Catering' : IDL.Text,
              'Stationery' : IDL.Text,
              'Music' : IDL.Text,
              'Venue' : IDL.Text,
              'Other' : IDL.Text,
              'Beauty' : IDL.Text,
              'Planning' : IDL.Text,
              'Photography' : IDL.Text,
              'Transport' : IDL.Text,
            }),
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'message' : IDL.Text,
              'vendor' : IDL.Record({
                'id' : IDL.Text,
                'portfolio' : IDL.Vec(IDL.Text),
                'serviceCost' : IDL.Nat64,
                'verified' : IDL.Bool,
                'reviews' : IDL.Vec(
                  IDL.Record({
                    'date' : IDL.Nat64,
                    'author' : IDL.Principal,
                    'comment' : IDL.Text,
                    'rating' : IDL.Nat64,
                  })
                ),
                'bookings' : IDL.Vec(IDL.Principal),
                'owner' : IDL.Principal,
                'name' : IDL.Text,
                'description' : IDL.Text,
                'availability' : IDL.Vec(IDL.Text),
                'category' : IDL.Variant({
                  'Attire' : IDL.Text,
                  'Favors' : IDL.Text,
                  'Cake' : IDL.Text,
                  'Decor' : IDL.Text,
                  'Catering' : IDL.Text,
                  'Stationery' : IDL.Text,
                  'Music' : IDL.Text,
                  'Venue' : IDL.Text,
                  'Other' : IDL.Text,
                  'Beauty' : IDL.Text,
                  'Planning' : IDL.Text,
                  'Photography' : IDL.Text,
                  'Transport' : IDL.Text,
                }),
                'rating' : IDL.Nat64,
              }),
            }),
            'Err' : IDL.Variant({
              'WeddingNotFound' : IDL.Text,
              'VendorNotFound' : IDL.Text,
              'InvalidDate' : IDL.Text,
              'DateUnavailable' : IDL.Text,
              'UnauthorizedAction' : IDL.Text,
              'BudgetExceeded' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'searchVendors' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'portfolio' : IDL.Vec(IDL.Text),
              'serviceCost' : IDL.Nat64,
              'verified' : IDL.Bool,
              'reviews' : IDL.Vec(
                IDL.Record({
                  'date' : IDL.Nat64,
                  'author' : IDL.Principal,
                  'comment' : IDL.Text,
                  'rating' : IDL.Nat64,
                })
              ),
              'bookings' : IDL.Vec(IDL.Principal),
              'owner' : IDL.Principal,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'availability' : IDL.Vec(IDL.Text),
              'category' : IDL.Variant({
                'Attire' : IDL.Text,
                'Favors' : IDL.Text,
                'Cake' : IDL.Text,
                'Decor' : IDL.Text,
                'Catering' : IDL.Text,
                'Stationery' : IDL.Text,
                'Music' : IDL.Text,
                'Venue' : IDL.Text,
                'Other' : IDL.Text,
                'Beauty' : IDL.Text,
                'Planning' : IDL.Text,
                'Photography' : IDL.Text,
                'Transport' : IDL.Text,
              }),
              'rating' : IDL.Nat64,
            })
          ),
        ],
        ['query'],
      ),
    'submitGuestRSVP' : IDL.Func(
        [
          IDL.Record({
            'plusOne' : IDL.Bool,
            'name' : IDL.Text,
            'guestEmail' : IDL.Text,
            'dietaryRestrictions' : IDL.Text,
            'weddingId' : IDL.Text,
            'tableAssignment' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'wedding' : IDL.Record({
                'id' : IDL.Text,
                'status' : IDL.Text,
                'tasks' : IDL.Vec(
                  IDL.Record({
                    'id' : IDL.Text,
                    'status' : IDL.Text,
                    'title' : IDL.Text,
                    'assignedTo' : IDL.Text,
                    'description' : IDL.Text,
                    'deadline' : IDL.Text,
                    'budget' : IDL.Nat64,
                  })
                ),
                'vendors' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'additionalDetails' : IDL.Opt(IDL.Text),
                    'weddingOffer' : IDL.Nat64,
                    'date' : IDL.Text,
                    'weddingId' : IDL.Text,
                    'vendorId' : IDL.Text,
                  })
                ),
                'date' : IDL.Text,
                'guestCount' : IDL.Nat64,
                'guestList' : IDL.Vec(
                  IDL.Record({
                    'plusOne' : IDL.Bool,
                    'rsvpStatus' : IDL.Text,
                    'name' : IDL.Text,
                    'guestEmail' : IDL.Text,
                    'dietaryRestrictions' : IDL.Text,
                    'tableAssignment' : IDL.Variant({
                      'familyTable' : IDL.Text,
                      'Table10' : IDL.Text,
                      'unassigned' : IDL.Text,
                      'VIPTable' : IDL.Text,
                      'Table1' : IDL.Text,
                      'Table2' : IDL.Text,
                      'Table3' : IDL.Text,
                      'Table4' : IDL.Text,
                      'Table5' : IDL.Text,
                      'Table6' : IDL.Text,
                      'Table7' : IDL.Text,
                      'Table8' : IDL.Text,
                      'Table9' : IDL.Text,
                    }),
                  })
                ),
                'coupleNames' : IDL.Vec(IDL.Text),
                'budget' : IDL.Nat64,
                'registry' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'name' : IDL.Text,
                    'description' : IDL.Text,
                    'purchasedBy' : IDL.Text,
                    'price' : IDL.Nat64,
                  })
                ),
                'location' : IDL.Text,
                'timeline' : IDL.Vec(
                  IDL.Record({
                    'status' : IDL.Text,
                    'time' : IDL.Text,
                    'description' : IDL.Text,
                    'responsible' : IDL.Text,
                    'weddingId' : IDL.Text,
                  })
                ),
              }),
              'message' : IDL.Text,
              'newGuest' : IDL.Record({
                'plusOne' : IDL.Bool,
                'rsvpStatus' : IDL.Text,
                'name' : IDL.Text,
                'guestEmail' : IDL.Text,
                'dietaryRestrictions' : IDL.Text,
                'tableAssignment' : IDL.Variant({
                  'familyTable' : IDL.Text,
                  'Table10' : IDL.Text,
                  'unassigned' : IDL.Text,
                  'VIPTable' : IDL.Text,
                  'Table1' : IDL.Text,
                  'Table2' : IDL.Text,
                  'Table3' : IDL.Text,
                  'Table4' : IDL.Text,
                  'Table5' : IDL.Text,
                  'Table6' : IDL.Text,
                  'Table7' : IDL.Text,
                  'Table8' : IDL.Text,
                  'Table9' : IDL.Text,
                }),
              }),
            }),
            'Err' : IDL.Variant({
              'WeddingNotFound' : IDL.Text,
              'VendorNotFound' : IDL.Text,
              'InvalidDate' : IDL.Text,
              'DateUnavailable' : IDL.Text,
              'UnauthorizedAction' : IDL.Text,
              'BudgetExceeded' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
