import * as propertiesController from "../controllers/properties.controller.js";

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management operations
 */

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of properties per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [available, sold, rented, pending]
 *         description: Filter by property status
 *       - in: query
 *         name: property_type
 *         schema:
 *           type: string
 *           enum: [apartment, house, villa, office, shop]
 *         description: Filter by property type
 *     responses:
 *       200:
 *         description: List of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 properties:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *                 success:
 *                   type: boolean
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 property:
 *                   $ref: '#/components/schemas/Property'
 *                 success:
 *                   type: boolean
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, price, location]
 *             properties:
 *               title:
 *                 type: string
 *                 description: Property title
 *               description:
 *                 type: string
 *                 description: Property description
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Property price
 *               location:
 *                 type: string
 *                 description: Property location
 *               area:
 *                 type: number
 *                 format: float
 *                 description: Property area in square meters
 *               bedrooms:
 *                 type: integer
 *                 description: Number of bedrooms
 *               bathrooms:
 *                 type: integer
 *                 description: Number of bathrooms
 *               property_type:
 *                 type: string
 *                 enum: [apartment, house, villa, office, shop]
 *                 description: Type of property
 *               status:
 *                 type: string
 *                 enum: [available, sold, rented, pending]
 *                 description: Property status
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of property image URLs
 *     responses:
 *       201:
 *         description: Property created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 property:
 *                   $ref: '#/components/schemas/Property'
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/properties/many:
 *   post:
 *     summary: Create multiple properties
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [properties]
 *             properties:
 *               properties:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [title, description, price, location]
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                       format: float
 *                     location:
 *                       type: string
 *                     area:
 *                       type: number
 *                       format: float
 *                     bedrooms:
 *                       type: integer
 *                     bathrooms:
 *                       type: integer
 *                     property_type:
 *                       type: string
 *                       enum: [apartment, house, villa, office, shop]
 *                     status:
 *                       type: string
 *                       enum: [available, sold, rented, pending]
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       201:
 *         description: Properties created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 properties:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Update property by ID
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               location:
 *                 type: string
 *               area:
 *                 type: number
 *                 format: float
 *               bedrooms:
 *                 type: integer
 *               bathrooms:
 *                 type: integer
 *               property_type:
 *                 type: string
 *                 enum: [apartment, house, villa, office, shop]
 *               status:
 *                 type: string
 *                 enum: [available, sold, rented, pending]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Property updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 property:
 *                   $ref: '#/components/schemas/Property'
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete property by ID
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

const propertiesRouter = (app) => {
  app.get("/api/properties", propertiesController.getProperties);
  app.get("/api/properties/:id", propertiesController.findPropertyById);
  app.post("/api/properties", propertiesController.createProperty);
  app.post("/api/properties/many", propertiesController.createManyProperty);
  app.put("/api/properties/:id", propertiesController.updateProperty);
  app.delete("/api/properties/:id", propertiesController.deleteProperty);
  app.post("/api/export/properties", propertiesController.exportProperties);
};

export default propertiesRouter;
