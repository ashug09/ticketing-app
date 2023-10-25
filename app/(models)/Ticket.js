import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGO_URI);

mongoose.Promise = global.Promise;
const TicketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    status: String,
    progess: Number,
    priority: Number,
    active: Boolean,
  },
  { timestamps: true }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema); //("collection name", schema name)
export default Ticket;
