import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPunchRecord extends Document {
  user: Types.ObjectId;
  punchIn: Date;
  punchOut?: Date;
  date: Date;
  location?: string;
  device?: string;
  notes?: string;
  punchType?: 'in' | 'out';
  isManual?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PunchRecordSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  punchIn: { type: Date, required: true },
  punchOut: { type: Date },
  date: { type: Date, required: true },
  location: { type: String },
  device: { type: String },
  notes: { type: String },
  punchType: { type: String, enum: ['in', 'out'] },
  isManual: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IPunchRecord>('PunchRecord', PunchRecordSchema); 