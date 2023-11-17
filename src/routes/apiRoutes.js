const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const RestaurantController = require("../controllers/RestaurantController");
const PlateController = require("../controllers/PlateController");
const OrderController = require("../controllers/OrderController");
const AuthenticationController = require("../controllers/AuthenticationController");
const requireAuth = require("../middlewares/require-auth");
const requireRole = require("../middlewares/require-role");

// Routes pour les utilisateurs
router.get("/users", [requireAuth, requireRole(["ADMIN"])], UserController.getUsers);
router.get("/user/me", [requireAuth], UserController.getCurrentUser);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.createUser);

// Routes pour les restaurants require role admin
router.get("/restaurants", RestaurantController.getRestaurants);
router.get("/restaurants/:id", RestaurantController.getRestaurantById);
router.post("/restaurants", RestaurantController.createRestaurant);

// Routes pour les assiettes role restaurant
router.get("/plates", PlateController.getPlates);
router.get("/plates/:id", PlateController.getPlateById);
router.post("/plates", PlateController.createPlate);

// Routes pour les commandes role restaurant
router.get("/orders", OrderController.getOrders);
router.get("/orders/:id", OrderController.getOrderById);
router.post("/orders", OrderController.createOrder);

// Routes pour l'authentification
router.post("/login", AuthenticationController.login);
router.post("/register", AuthenticationController.register);

module.exports = router;
