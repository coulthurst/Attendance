const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const appRoutes = express.Router();
const PORT = 4000;

let Group = require("./models/group.model");
let Session = require("./models/session.model");
let Practice = require("./models/practice.model");
let Student = require("./models/student.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/groups", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// Get all
appRoutes.route("/groups").get(function(req, res) {
  Group.find(function(err, groups) {
    if (err) {
      console.log(err);
    } else {
      res.json(groups);
    }
  });
});
appRoutes.route("/sessions").get(function(req, res) {
  Session.find(function(err, sessions) {
    if (err) {
      console.log(err);
    } else {
      res.json(sessions);
    }
  });
});
appRoutes.route("/practices").get(function(req, res) {
  Practice.find(function(err, practices) {
    if (err) {
      console.log(err);
    } else {
      res.json(practices);
    }
  });
});
appRoutes.route("/students").get(function(req, res) {
  Student.find(function(err, students) {
    if (err) {
      console.log(err);
    } else {
      res.json(students);
    }
  });
});

// Get by ID
appRoutes.route("/group/:id").get(function(req, res) {
  let id = req.params.id;
  Group.findById(id, function(err, group) {
    res.json(group);
  });
});
appRoutes.route("/session/:id").get(function(req, res) {
  let id = req.params.id;
  Session.findById(id, function(err, sessions) {
    res.json(session);
  });
});
appRoutes.route("/practice/:id").get(function(req, res) {
  let id = req.params.id;
  Practice.findById(id, function(err, practice) {
    res.json(practice);
  });
});
appRoutes.route("/student/:id").get(function(req, res) {
  let id = req.params.id;
  Student.findById(id, function(err, student) {
    res.json(student);
  });
});

// Update
appRoutes.route("/group/update/:id").post(function(req, res) {
  Group.findById(req.params.id, function(err, group) {
    if (!group) res.status(404).send("data is not found");
    else group.name = req.body.name;
    group.sessions = req.body.sessions;
    group
      .save()
      .then(group => {
        res.json("group updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});
appRoutes.route("/session/update/:id").post(function(req, res) {
  Session.findById(req.params.id, function(err, session) {
    if (!session) res.status(404).send("data is not found");
    else session.name = req.body.name;
    session.sessions = req.body.sessions;
    session
      .save()
      .then(session => {
        res.json("session updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});
appRoutes.route("/practice/update/:id").post(function(req, res) {
  Practice.findById(req.params.id, function(err, practice) {
    if (!practice) res.status(404).send("data is not found");
    else practice.name = req.body.name;
    practice.practices = req.body.practices;
    practice
      .save()
      .then(practice => {
        res.json("practice updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});
appRoutes.route("/student/update/:id").post(function(req, res) {
  Student.findById(req.params.id, function(err, student) {
    if (!student) res.status(404).send("data is not found");
    else student.name = req.body.name;
    student.students = req.body.students;
    student
      .save()
      .then(student => {
        res.json("student updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

// Post
appRoutes.route("/group/add").post(function(req, res) {
  let group = new Group(req.body);
  group
    .save()
    .then(group => {
      res.status(200).json({ group: "added successfully?" });
    })
    .catch(err => {
      res.status(400).send("adding new group failed");
    });
});
appRoutes.route("/session/add").post(function(req, res) {
  let session = new Session(req.body);
  session
    .save()
    .then(session => {
      res.status(200).json({ session: "added successfully?" });
    })
    .catch(err => {
      res.status(400).send("adding new session failed");
    });
});
appRoutes.route("/practice/add").post(function(req, res) {
  let practice = new Practice(req.body);
  practice
    .save()
    .then(practice => {
      res.status(200).json({ practice: "added successfully?" });
    })
    .catch(err => {
      res.status(400).send("adding new practice failed");
    });
});
appRoutes.route("/student/add").post(function(req, res) {
  let student = new Student(req.body);
  student
    .save()
    .then(student => {
      res.status(200).json({ student: "added successfully?" });
    })
    .catch(err => {
      res.status(400).send("adding new student failed");
    });
});

//Delete
appRoutes.route("/group/delete/:id").delete(function(req, res) {
  Group.findByIdAndRemove(req.params.id, req.body, function(err, group) {
    if (err) return next(err);
    res.status(200).json({ group: "deleted successfully?" });
  });
});
appRoutes.route("/session/delete/:id").delete(function(req, res) {
  Session.findByIdAndRemove(req.params.id, req.body, function(err, session) {
    if (err) return next(err);
    res.status(200).json({ session: "deleted successfully?" });
  });
});
appRoutes.route("/practice/delete/:id").delete(function(req, res) {
  Practice.findByIdAndRemove(req.params.id, req.body, function(err, practice) {
    if (err) return next(err);
    res.status(200).json({ practice: "deleted successfully?" });
  });
});
appRoutes.route("/student/delete/:id").delete(function(req, res) {
  Student.findByIdAndRemove(req.params.id, req.body, function(err, student) {
    if (err) return next(err);
    res.status(200).json({ student: "deleted successfully?" });
  });
});

app.use("/", appRoutes);
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
