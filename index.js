import express from "express";
import users from "./MOCK_DATA (1).json" assert { type: "json" };
import fs from "fs";
import connectDB from "./db/conntect.js";
const app = express();
const port = 6400;
app.use(express.urlencoded({ extended: false }));

// how to send html tang on responce
// app.get("/users", (req, res) => {
//     const html = `<ui>
//       ${users.map((user) => `<li>${user.gender}</li>`).join("")}
//       </ui>`;
//     res.send(html);
//   });

// 1 : GET /users -  get all user data
connectDB()
  .then(() => {
    app.get("/users", (req, res) => {
      return res.json(users);
    });

    app.post("/users", (req, res) => {
      const body = req.body;

      users.push({ ...body, id: users.length + 1 });
      fs.writeFile(
        "./MOCK_DATA (1).json",
        JSON.stringify(users),
        (err, data) => {
          return res.json({ status: "success" });
        }
      );
    });

    // 2 GET /users/id -  get specific user with url id

    // and i make it grouping

    app
      .route("/users/:id")
      .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) return res.status(404).send({ msg: "User Not Found" });
        return res.send(user);
      })
      .patch((req, res) => {
        const id = Number(req.params.id);
        const index = users.findIndex((user) => user.id === id);

        users[index] = { ...users[index], ...req.body };

        fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err) => {
          if (err) {
            console.log("error");
          } else {
            return res.json({ status: "success", user: users[index] });
          }
        });
      })
      .delete((req, res) => {
        const id = Number(req.params.id);
        const index = users.findIndex((user) => user.id === id);
        if (!id === -1 || !index === -1)
          return res.status(404).send({ msg: "Not Found" });
        users.splice(index, 1);

        fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err) => {
          if (err) {
            console.log("error");
          } else return res.json({ status: "Success" });
        });
      });

    app.listen(port, () => console.log(`app listen on port ${port}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
