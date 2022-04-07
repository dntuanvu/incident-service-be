import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/users/user.model';

import { Incident } from './incident.model';

@Injectable()
export class IncidentService {

    constructor(
        @InjectModel('Incident') private readonly incidentModel: Model<Incident>,
        @InjectModel('Users') private readonly userModel: Model<User>
    ) {}

    async insertIncident(type: string, detail: string, creator: any) {
        if (creator.role !== "admin") {
            throw new NotFoundException('Only admin can raise an incident.'); 
        }
        const newIncident = new this.incidentModel({
            type,
            detail,
            created_by: creator.userId,
            assignee: null, 
            created_at: new Date().getTime(),
            updated_at: new Date().getTime(),
            acknowledged_at : null,
            resolved_at : null
        });

        const result = await newIncident.save();
        return result.id as string; 
    }

    async assignIncident(incidentId: string, assignee: string, creator: any) {
        const updatedIncident = await this.findIncident(incidentId); 

        console.log("created_by=" + updatedIncident.created_by)
        console.log("creator=" + JSON.stringify(creator))
        console.log("role=" + creator.role)
        if (updatedIncident.created_by !== creator.userId || creator.role !== "admin") {
            throw new NotFoundException('Could not find incident.'); 
        }

        updatedIncident.assignee = assignee;
        updatedIncident.updated_at = new Date().getTime().toString();

        updatedIncident.save();
    }

    async acknowledgeIncident(incidentId: string, assignee: any) {
        const updatedIncident = await this.findIncident(incidentId); 
        if (updatedIncident.assignee !== assignee.userId) {
            throw new NotFoundException('Could not find incident.'); 
        }

        updatedIncident.assignee = assignee.userId;
        updatedIncident.acknowledged_at = new Date().getTime().toString();

        updatedIncident.save();
    }

    async resolveIncident(incidentId: string, assignee: any) {
        const updatedIncident = await this.findIncident(incidentId); 
        if (updatedIncident.assignee !== assignee.userId) {
            throw new NotFoundException('Could not find incident.'); 
        }
        updatedIncident.assignee = assignee.userId;
        updatedIncident.resolved_at = new Date().getTime().toString();

        updatedIncident.save();
    }

    async getAllIncident() {
        const incidents = await this.incidentModel.find().exec();
        return incidents.map(inc => ({
            id: inc.id,
            type: inc.type,
            detail: inc.detail,
            created_by: inc.created_by,
            updated_at: inc.updated_at,
            created_at: inc.created_at, 
            assignee: inc.assignee, 
            acknowledged_at: inc.acknowledged_at, 
            resolved_at: inc.resolved_at
        }))
    }

    async getSingleIncident(incidentId: string) {
        const incident = await this.findIncident(incidentId); 
        const assignee = await this.findUser(incident.assignee);
        const creator = await this.findUser(incident.created_by);

        return {
            id: incident.id,
            type: incident.type,
            detail: incident.detail,
            assignee: assignee === null ? null : { id: assignee.id, email: assignee.email },
            created_by: { id: creator.id, email: creator.email },
            created_at: incident.created_at,
            acknowledged_at: incident === null ? null : incident.acknowledged_at, 
            resolved_at: incident === null ? null : incident.resolved_at
        };
    }

    async deleteIncident(incidentId: string) {
        await this.incidentModel.deleteOne({ _id: incidentId });
    }

    private async findIncident(id: string): Promise<Incident> {
        let incident;
        try {
            incident = await this.incidentModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find incident.'); 
        }
        
        return incident
    }

    private async findUser(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find user.'); 
        }
        
        return user
    }

}
