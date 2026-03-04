import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    featured : Bool;
  };

  type Category = { #festive; #casual; #everydayElegance };

  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
  };

  let products = Map.empty<Nat, Product>();
  let inquiries = Map.empty<Nat, Inquiry>();

  var nextProductId = 9;
  var nextInquiryId = 1;

  // Initialize with sample products
  system func preupgrade() { };
  system func postupgrade() {
    products.add(
      1,
      {
        id = 1;
        name = "Anarkali Kurta";
        description = "Traditional festive Anarkali kurta with embroidery";
        price = 2500;
        category = #festive;
        featured = true;
      },
    );
    products.add(
      2,
      {
        id = 2;
        name = "Cotton Saree";
        description = "Lightweight cotton saree for casual wear";
        price = 1500;
        category = #casual;
        featured = false;
      },
    );
    products.add(
      3,
      {
        id = 3;
        name = "Chiffon Dupatta";
        description = "Elegant chiffon dupatta for festive occasions";
        price = 800;
        category = #festive;
        featured = true;
      },
    );
    products.add(
      4,
      {
        id = 4;
        name = "Printed Kurti";
        description = "Everyday printed kurti with comfortable fabric";
        price = 900;
        category = #everydayElegance;
        featured = false;
      },
    );
    products.add(
      5,
      {
        id = 5;
        name = "Palazzo Pants";
        description = "Casual palazzo pants for daily wear";
        price = 1200;
        category = #casual;
        featured = false;
      },
    );
    products.add(
      6,
      {
        id = 6;
        name = "Festive Lehenga";
        description = "Traditional festive lehenga with detailed work";
        price = 3500;
        category = #festive;
        featured = true;
      },
    );
    products.add(
      7,
      {
        id = 7;
        name = "Silk Dupatta";
        description = "Elegant silk dupatta for special occasions";
        price = 1000;
        category = #festive;
        featured = false;
      },
    );
    products.add(
      8,
      {
        id = 8;
        name = "Casual Tunic";
        description = "Comfortable tunic for everyday use";
        price = 800;
        category = #casual;
        featured = false;
      },
    );
  };

  // Product Functions
  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    let categoryEnum = switch (category.toLower()) {
      case ("festive") { #festive };
      case ("casual") { #casual };
      case ("everydayelegance") { #everydayElegance };
      case (_) { Runtime.trap("Invalid category") };
    };

    products.values().toArray().filter(
      func(p) { p.category == categoryEnum }
    );
  };

  public query func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(
      func(p) { p.featured }
    );
  };

  // Inquiry Functions
  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text) : async Bool {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      name;
      email;
      message;
    };

    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
    true;
  };

  public query ({ caller }) func getInquiries(isAdmin : Bool) : async [Inquiry] {
    if (not isAdmin) { Runtime.trap("Admin access required") };
    inquiries.values().toArray();
  };
};
