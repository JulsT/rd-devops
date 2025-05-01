// 1. DATABASE SETUP AND CONFIGURATION

// Switch to desired database (creates it if it doesn't exist)
db = db.getSiblingDB("gymDatabase");

// Drop collections if they exist (for clean start)
db.clients.drop();
db.memberships.drop();
db.workouts.drop();
db.trainers.drop();

// Create collections with schema validation
db.createCollection("clients", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["client_id", "name", "age", "email"],
      properties: {
        client_id: { bsonType: "int" },
        name: { bsonType: "string" },
        age: { bsonType: "int", minimum: 16 },
        email: { bsonType: "string", pattern: "^.+@.+$" }
      }
    }
  }
});

db.createCollection("memberships", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["membership_id", "client_id", "start_date", "end_date", "type"],
      properties: {
        membership_id: { bsonType: "int" },
        client_id: { bsonType: "int" },
        start_date: { bsonType: "date" },
        end_date: { bsonType: "date" },
        type: { enum: ["standard", "premium", "vip"] }
      }
    }
  }
});

db.createCollection("workouts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["workout_id", "description", "difficulty"],
      properties: {
        workout_id: { bsonType: "int" },
        description: { bsonType: "string" },
        difficulty: { enum: ["easy", "medium", "hard"] }
      }
    }
  }
});

db.createCollection("trainers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["trainer_id", "name", "specialization"],
      properties: {
        trainer_id: { bsonType: "int" },
        name: { bsonType: "string" },
        specialization: { bsonType: "string" }
      }
    }
  }
});

// 2. POPULATING DATABASE WITH DATA

// Adding clients
db.clients.insertMany([
  { 
    client_id: 1, 
    name: "Ivan Petrenko", 
    age: 28, 
    email: "ivan@example.com", 
  },
  { 
    client_id: 2, 
    name: "Olena Koval", 
    age: 34, 
    email: "olena@example.com",
  },
  { 
    client_id: 3, 
    name: "Maksym Dubenko", 
    age: 42, 
    email: "maksym@example.com",
  },
  { 
    client_id: 4, 
    name: "Tetiana Lysenko", 
    age: 25, 
    email: "tetiana@example.com",
  },
  { 
    client_id: 5, 
    name: "Andriy Savchenko", 
    age: 31, 
    email: "andriy@example.com",
  }
]);

// Adding membership data
db.memberships.insertMany([
  { 
    membership_id: 101, 
    client_id: 1, 
    start_date: new Date("2024-04-01"), 
    end_date: new Date("2024-07-01"), 
    type: "standard",
  },
  { 
    membership_id: 102, 
    client_id: 2, 
    start_date: new Date("2024-03-15"), 
    end_date: new Date("2024-09-15"), 
    type: "premium",
  },
  { 
    membership_id: 103, 
    client_id: 3, 
    start_date: new Date("2024-02-20"), 
    end_date: new Date("2024-05-20"), 
    type: "standard",
  },
  { 
    membership_id: 104, 
    client_id: 4, 
    start_date: new Date("2024-04-10"), 
    end_date: new Date("2025-04-10"), 
    type: "vip",
  },
  { 
    membership_id: 105, 
    client_id: 5, 
    start_date: new Date("2024-03-01"), 
    end_date: new Date("2024-06-01"), 
    type: "standard",
  }
]);

// Adding workout types
db.workouts.insertMany([
  { 
    workout_id: 201, 
    description: "Cardio Training", 
    difficulty: "easy",
  },
  { 
    workout_id: 202, 
    description: "Strength Training", 
    difficulty: "medium",
  },
  { 
    workout_id: 203, 
    description: "CrossFit", 
    difficulty: "hard",
  },
  { 
    workout_id: 204, 
    description: "Pilates", 
    difficulty: "medium",
  },
  { 
    workout_id: 205, 
    description: "Yoga", 
    difficulty: "medium",
  },
  { 
    workout_id: 206, 
    description: "HIIT", 
    difficulty: "hard",
  }
]);

// Adding trainers
db.trainers.insertMany([
  { 
    trainer_id: 301, 
    name: "Andriy Vitrenko", 
    specialization: "Weight Training",
  },
  { 
    trainer_id: 302, 
    name: "Natalia Zorenko", 
    specialization: "Yoga",
  },
  { 
    trainer_id: 303, 
    name: "Sergiy Mishchenko", 
    specialization: "CrossFit",
  },
  { 
    trainer_id: 304, 
    name: "Iryna Kovalchuk", 
    specialization: "Pilates",
  }
]);

// 3. ADDING RELATIONSHIPS BETWEEN COLLECTIONS

// Add workout IDs to clients
db.clients.updateOne(
  { client_id: 1 },
  { $set: { workout_ids: [201, 204] } }
);

db.clients.updateOne(
  { client_id: 2 },
  { $set: { workout_ids: [202, 203] } }
);

db.clients.updateOne(
  { client_id: 3 },
  { $set: { workout_ids: [203, 206] } }
);

db.clients.updateOne(
  { client_id: 4 },
  { $set: { workout_ids: [204, 205] } }
);

db.clients.updateOne(
  { client_id: 5 },
  { $set: { workout_ids: [201, 202] } }
);

// Add trainer assignments to clients
db.clients.updateOne(
  { client_id: 1 },
  { $set: { trainer_id: 304 } }
);

db.clients.updateOne(
  { client_id: 2 },
  { $set: { trainer_id: 303 } }
);

db.clients.updateOne(
  { client_id: 3 },
  { $set: { trainer_id: 303 } }
);

db.clients.updateOne(
  { client_id: 4 },
  { $set: { trainer_id: 302 } }
);

db.clients.updateOne(
  { client_id: 5 },
  { $set: { trainer_id: 301 } }
);

// 4. QUERIES
// -------------------------------

// Task 1: Find all clients over 30 years old
print("\n--- Clients Over 30 Years Old ---");
db.clients.find({ age: { $gt: 30 } }).forEach(printjson);

// Task 2: List workouts with medium difficulty
print("\n--- Workouts with Medium Difficulty ---");
db.workouts.find({ difficulty: "medium" }).forEach(printjson);

// Task 3: Show membership information for client with id 2
print("\n--- Membership Information for Client #2 ---");
db.memberships.find({ client_id: 2 }).forEach(printjson);

print("\n--- Database Setup and Queries Complete ---");