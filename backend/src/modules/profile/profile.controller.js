export async function getProfile(req, res) {
  try {
    return res.json({
      id: req.user.id,
      email: req.user.email,
      credits: req.user.credits,
      plan: req.user.plan,
      username: req.user.username || "User",
    });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
