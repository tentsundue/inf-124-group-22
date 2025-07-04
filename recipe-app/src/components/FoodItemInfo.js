import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
export default function FoodItemInfo({ foodItem, onClose }) {
  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1299,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "fixed",
          top: { xs: 0, sm: "50%" },
          left: { xs: 0, sm: "50%" },
          transform: { xs: "none", sm: "translate(-50%, -50%)" },
          width: { xs: "100%", sm: 400 },
          maxHeight: { xs: "100%", sm: "90vh" },
          bgcolor: "background.paper",
          p: 2,
          borderRadius: { xs: 0, sm: 2 },
          boxShadow: 24,
          zIndex: 1300,
          overflowY: "auto",
        }}
      >
        <h1>{foodItem.name}</h1>
        <h2>Quantity: {foodItem.quantity}</h2>
        <h3>Food Category: {foodItem.foodCategory}</h3>
        <h4>Nutrition:</h4>
        <div>
          {(() => {
            let nutrients = [];
            try {
              nutrients = typeof foodItem.description === "string"
                ? JSON.parse(foodItem.description)
                : Array.isArray(foodItem.description)
                  ? foodItem.description
                  : [];
            } catch (e) {
              nutrients = [];
            }
            return nutrients.map((nutrient, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <strong>{nutrient.nutrientName}:</strong> {nutrient.value} {nutrient.unitName}
                {nutrient.unit}
              </div>
            ));
          })()}
        </div>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#2196f3",
                color: "#fff",
              },
            }}>
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
