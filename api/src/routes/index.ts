import { Router } from "express";

const router = Router();

//Falta los controllers
router.use("/test", (req, res) => {
  res.send("uwu");
});

export default router;