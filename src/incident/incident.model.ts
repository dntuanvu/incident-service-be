import * as mongoose from 'mongoose'; 
import { timestamp } from 'rxjs';
import { Timestamp } from 'typeorm';

const Schema = mongoose.Schema;

export const IncidentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    detail: { type: String, required: true },
    created_by: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
    assignee: { type: String, required: false },
    acknowledged_at: { type: String, required: false },
    resolved_at: { type: String, required: false },
}); 

export interface Incident extends mongoose.Document {
    id: string,
    type: string,
    detail: string,
    created_by: string, 
    created_at: string, 
    updated_at: string,
    assignee: string, 
    acknowledged_at: string,
    resolved_at: string
}