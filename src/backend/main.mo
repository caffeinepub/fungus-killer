import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "./authorization/access-control";
import Prim "mo:prim";

actor {
  // --- Existing Submission type ---
  type Submission = {
    name : Text;
    contactInfo : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Submission {
    public func compare(a : Submission, b : Submission) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let submissionsMap = Map.empty<Text, Submission>();
  var counter = 0;

  public shared ({ caller }) func submitContactForm(name : Text, contactInfo : Text, message : Text) : async Text {
    if (name.isEmpty() or contactInfo.isEmpty() or message.isEmpty()) {
      Runtime.trap("All fields are required.");
    };
    let timestamp = Time.now();
    let id = counter.toText();
    let newSubmission : Submission = { name; contactInfo; message; timestamp };
    submissionsMap.add(id, newSubmission);
    counter += 1;
    id;
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissionsMap.values().toArray().sort();
  };

  // --- Order type ---
  type Order_ = {
    name : Text;
    mobile : Text;
    address : Text;
    city : Text;
    pincode : Text;
    quantity : Nat;
    timestamp : Time.Time;
  };

  module Order_ {
    public func compare(a : Order_, b : Order_) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let ordersMap = Map.empty<Text, Order_>();
  var orderCounter = 0;

  // Authorization state
  let accessControlState = AccessControl.initState();

  public shared ({ caller }) func _initializeAccessControlWithSecret(userSecret : Text) : async () {
    switch (Prim.envVar<system>("CAFFEINE_ADMIN_TOKEN")) {
      case (null) {
        Runtime.trap("CAFFEINE_ADMIN_TOKEN environment variable is not set");
      };
      case (?adminToken) {
        AccessControl.initialize(accessControlState, caller, adminToken, userSecret);
      };
    };
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public shared ({ caller }) func submitOrder(name : Text, mobile : Text, address : Text, city : Text, pincode : Text, quantity : Nat) : async Text {
    if (name.isEmpty() or mobile.isEmpty() or address.isEmpty() or city.isEmpty() or pincode.isEmpty()) {
      Runtime.trap("All fields are required.");
    };
    let timestamp = Time.now();
    let id = orderCounter.toText();
    let newOrder : Order_ = { name; mobile; address; city; pincode; quantity; timestamp };
    ordersMap.add(id, newOrder);
    orderCounter += 1;
    id;
  };

  public query ({ caller }) func getOrders() : async [Order_] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required.");
    };
    ordersMap.values().toArray().sort();
  };
};
