import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Webhook route
app.post("/webhook", (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const params = req.body.queryResult.parameters || {};

  let responseText = "Sorry, I didn’t get that.";

  if (intent === "Scholarship Suggestion") {
    const { state, income, category, class: studentClass } = params;

    responseText = `Based on your details:
- State: ${state}
- Class: ${studentClass}
- Category: ${category}
- Family Income: ${income}

Here are some scholarships you might be eligible for:
🎓 1. National Means-cum-Merit Scholarship
🎓 2. Central Sector Scheme of Scholarships for College and University Students`;

    if (category?.toLowerCase().includes("sc")) {
      responseText += `\n🎓 3. Post-Matric Scholarship for Scheduled Castes`;
    }
    if (category?.toLowerCase().includes("st")) {
      responseText += `\n🎓 4. Top Class Education Scheme for ST Students`;
    }
  }

  res.json({ fulfillmentText: responseText });
});

// Root route
app.get("/", (req, res) => res.send("✅ Dialogflow Webhook is running!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
