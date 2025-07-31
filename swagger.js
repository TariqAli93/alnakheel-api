import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Al-Nakheel API",
      version: "1.0.0",
      description: "API documentation for Al-Nakheel real estate management system",
      contact: {
        name: "API Support",
        email: "support@alnakheel.com"
      }
    },
    tags: [
      {
        name: "Users",
        description: "Operations related to users"
      },
      {
        name: "Properties",
        description: "Operations related to properties"
      },
      {
        name: "Clients",
        description: "Operations related to clients"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "https",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        User: {
          type: "object",
          required: ["username", "password", "email", "full_name"],
          properties: {
            id: {
              type: "integer",
              description: "User unique identifier"
            },
            username: {
              type: "string",
              description: "User's username"
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address"
            },
            full_name: {
              type: "string",
              description: "User's full name"
            },
            phone: {
              type: "string",
              description: "User's phone number"
            },
            role: {
              type: "string",
              enum: ["admin", "user", "manager"],
              description: "User's role in the system"
            },
            is_active: {
              type: "boolean",
              description: "Whether the user is active"
            },
            is_banned: {
              type: "boolean",
              description: "Whether the user is banned"
            },
            is_deleted: {
              type: "boolean",
              description: "Whether the user is deleted"
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "User creation timestamp"
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "User last update timestamp"
            }
          }
        },
        Property: {
          type: "object",
          required: ["title", "description", "price", "location"],
          properties: {
            id: {
              type: "integer",
              description: "Property unique identifier"
            },
            title: {
              type: "string",
              description: "Property title"
            },
            description: {
              type: "string",
              description: "Property description"
            },
            price: {
              type: "number",
              format: "float",
              description: "Property price"
            },
            location: {
              type: "string",
              description: "Property location"
            },
            area: {
              type: "number",
              format: "float",
              description: "Property area in square meters"
            },
            bedrooms: {
              type: "integer",
              description: "Number of bedrooms"
            },
            bathrooms: {
              type: "integer",
              description: "Number of bathrooms"
            },
            property_type: {
              type: "string",
              enum: ["apartment", "house", "villa", "office", "shop"],
              description: "Type of property"
            },
            status: {
              type: "string",
              enum: ["available", "sold", "rented", "pending"],
              description: "Property status"
            },
            images: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Array of property image URLs"
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Property creation timestamp"
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "Property last update timestamp"
            }
          }
        },
        Client: {
          type: "object",
          required: ["name", "phone"],
          properties: {
            id: {
              type: "integer",
              description: "Client unique identifier"
            },
            name: {
              type: "string",
              description: "Client's full name"
            },
            phone: {
              type: "string",
              description: "Client's phone number"
            },
            email: {
              type: "string",
              format: "email",
              description: "Client's email address"
            },
            address: {
              type: "string",
              description: "Client's address"
            },
            notes: {
              type: "string",
              description: "Additional notes about the client"
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Client creation timestamp"
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "Client last update timestamp"
            }
          }
        },
        LoginRequest: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: {
              type: "string",
              description: "User's username"
            },
            password: {
              type: "string",
              format: "password",
              description: "User's password"
            }
          }
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Response message"
            },
            token: {
              type: "string",
              description: "JWT authentication token"
            },
            success: {
              type: "boolean",
              description: "Operation success status"
            }
          }
        },
        RegisterRequest: {
          type: "object",
          required: ["username", "password", "email", "full_name"],
          properties: {
            username: {
              type: "string",
              description: "Desired username"
            },
            password: {
              type: "string",
              format: "password",
              description: "User's password"
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address"
            },
            full_name: {
              type: "string",
              description: "User's full name"
            },
            phone: {
              type: "string",
              description: "User's phone number"
            },
            role: {
              type: "string",
              enum: ["admin", "user", "manager"],
              description: "User's role in the system"
            }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message"
            },
            success: {
              type: "boolean",
              description: "Operation success status (always false for errors)"
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
