const { Schema } = require("mongoose");

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    StreetAddress: String,
    paid: Boolean,
});

export const Order = models?.Order || model('Order', OrderSchema);