import mongoose from 'mongoose';

const bodyMeasurementSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    chest: { type: Number, default: 0 },
    waist: { type: Number, default: 0 },
    hips: { type: Number, default: 0 },
    biceps: { type: Number, default: 0 },
    thighs: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BodyMeasurement = mongoose.model('BodyMeasurement', bodyMeasurementSchema);
export default BodyMeasurement;
