
// Temporary timetable data
let classes = [
  {
    id: 1,
    subject: "Data Structures",
    teacher: "Dr. Sharma",
    room: "C-204",
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    type: "Lecture",
  },
  {
    id: 2,
    subject: "Operating Systems",
    teacher: "Dr. Singh",
    room: "B-102",
    day: "Tuesday",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    type: "Lecture",
  },
];

// GET: Fetch all classes
const getAllClasses = (req, res) => {
  res.status(200).json({
    success: true,
    count: classes.length,
    data: classes,
  });
};

// GET: Fetch one class by ID
const getClassById = (req, res) => {
  const classItem = classes.find(
    (item) => String(item.id) === req.params.id
  );

  if (!classItem) {
    return res.status(404).json({
      success: false,
      message: "Class not found",
    });
  }

  res.status(200).json({
    success: true,
    data: classItem,
  });
};

// POST: Add a new class
const addClass = (req, res) => {
  const {
    subject,
    teacher,
    room,
    day,
    startTime,
    endTime,
    type,
  } = req.body;

  if (
    !subject?.trim() ||
    !teacher?.trim() ||
    !room?.trim() ||
    !day?.trim() ||
    !startTime?.trim() ||
    !endTime?.trim() ||
    !type?.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all class details",
    });
  }

  const newClass = {
    id: Date.now(),
    subject: subject.trim(),
    teacher: teacher.trim(),
    room: room.trim(),
    day: day.trim(),
    startTime: startTime.trim(),
    endTime: endTime.trim(),
    type: type.trim(),
  };

  classes.push(newClass);

  res.status(201).json({
    success: true,
    message: "Class added successfully",
    data: newClass,
  });
};

// PUT: Update an existing class
const updateClass = (req, res) => {
  const classIndex = classes.findIndex(
    (item) => String(item.id) === req.params.id
  );

  if (classIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Class not found",
    });
  }

  const {
    subject,
    teacher,
    room,
    day,
    startTime,
    endTime,
    type,
  } = req.body;

  if (
    !subject?.trim() ||
    !teacher?.trim() ||
    !room?.trim() ||
    !day?.trim() ||
    !startTime?.trim() ||
    !endTime?.trim() ||
    !type?.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all class details",
    });
  }

  classes[classIndex] = {
    id: classes[classIndex].id,
    subject: subject.trim(),
    teacher: teacher.trim(),
    room: room.trim(),
    day: day.trim(),
    startTime: startTime.trim(),
    endTime: endTime.trim(),
    type: type.trim(),
  };

  res.status(200).json({
    success: true,
    message: "Class updated successfully",
    data: classes[classIndex],
  });
};

// DELETE: Remove a class
const deleteClass = (req, res) => {
  const classIndex = classes.findIndex(
    (item) => String(item.id) === req.params.id
  );

  if (classIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Class not found",
    });
  }

  const deletedClass = classes[classIndex];

  classes.splice(classIndex, 1);

  res.status(200).json({
    success: true,
    message: "Class deleted successfully",
    data: deletedClass,
  });
};

module.exports = {
  getAllClasses,
  getClassById,
  addClass,
  updateClass,
  deleteClass,
};
