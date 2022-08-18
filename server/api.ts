import { rtdb } from "./realtimeDB";
import { firestore } from "./database";
import cors from "cors";
import express from "express";
import nanoid from "nanoid";
/* 
const port = 3009; */
const port = 3009;
const app = express();

app.use(express.json());
app.use(cors());

const userCollectionRef = firestore.collection("users");
const roomCollection = firestore.collection("rooms");

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  userCollectionRef
    .where("email", "==", email)
    .get()
    .then((searchRes) => {
      console.log("soy la respuesta de la busqueda", searchRes);
      if (searchRes.empty) {
        userCollectionRef
          .add({
            email,
            name,
          })
          .then((newUserRef) => {
            res.json({
              id: newUserRef.id,
              new: true,
            });
          });
      } else {
        res.status(400).json({
          message: "usuario ya registrado",
        });
      }
    });

  userCollectionRef.doc("1234");
});

app.post("/auth", (req, res) => {
  const { email } = req.body;
  userCollectionRef
    .where("email", "==", email)
    .get()
    .then((searchRes) => {
      if (searchRes.empty) {
        res.status(404).json({
          message: "user not found",
        });
      } else {
        res.json({
          id: searchRes.docs[0].id,
        });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  userCollectionRef
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + nanoid());
        roomRef
          .set({
            messages: [],
            owner: userId,
          })
          .then(() => {
            const roomRealId = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999);
            roomCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: roomRealId,
              })
              .then(() => {
                res.json({
                  id: roomId,
                });
              });
          });
      } else {
        res.status(401).json({
          message: "el usuario no existe, no se pudo crear la room",
        });
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;
  userCollectionRef
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomCollection
          .doc(roomId)
          .get()
          .then((snap) => {
            const data = snap.data();
            res.json(data);
          });
      } else {
        res.status(401).json({
          message: "el id de la room no existe",
        });
      }
    });
});

app.listen(port, () => {
  console.log("Server connected at http://localhost:${port}");
});
