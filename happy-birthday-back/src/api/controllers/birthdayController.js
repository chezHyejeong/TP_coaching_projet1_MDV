const pool = require("../../config/db");

exports.getTodaysBirthday = async (req, res) => {
  try {
    const query = `
      SELECT id, birthday, lastname, firstname, email 
      FROM students 
      WHERE DATE_FORMAT(birthday, "%m-%d") = DATE_FORMAT(NOW(), "%m-%d")
    `;
    const [results] = await pool.query(query);

    if (!results.length) {
      return res.json({
        count_total: 0,
        students_birthday: [],
        teachers_birthday: [],
      });
    }

    const students_birthday = results.map((row) => ({
      id: row.id,
      birthday: row.birthday,
      lastname: row.lastname,
      firstname: row.firstname,
      email: row.email,
    }));

    return res.json({
      count_total: students_birthday.length,
      students_birthday,
      teachers_birthday: [],
    });
  } catch (error) {
    console.error("Error reading from database:", error);
    return res.status(500).json({ error: "Database error" });
  }
};
