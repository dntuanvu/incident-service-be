import { Controller, Get, Post, Request, Delete, Body, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IncidentService } from './incident.service';

@Controller('incident')
export class IncidentController {

    constructor(private readonly incidentService: IncidentService) {}

    @UseGuards(JwtAuthGuard)
    @Post('raise') 
    async raise(@Request() req, @Body('type') type: string, @Body('detail') detail: string) {
        const creator = req.user;
        const generatedId = await this.incidentService.insertIncident(type, detail, creator);
        
        return {
            incident_id: generatedId,
            creator: creator, 
            incident: {
                type: type,
                detail: detail
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('assign') 
    async assign(@Request() req, @Body('incident_id') incident_id: string, @Body('assignee') assignee: string) {
        const creator = req.user;
        await this.incidentService.assignIncident(incident_id, assignee, creator);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Post('acknowledge') 
    async acknowledge(@Request() req, @Body('incident_id') incident_id: string) {
        const assignee = req.user; 
        await this.incidentService.acknowledgeIncident(incident_id, assignee);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Post('resolve') 
    async resolve(@Request() req, @Body('incident_id') incident_id: string) {
        const assignee = req.user; 
        await this.incidentService.resolveIncident(incident_id, assignee);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Get('all') 
    async getAll(@Request() req) {
        const incidents = await this.incidentService.getAllIncident();
        
        return { 
            incidents
         }; 
    }

    @UseGuards(JwtAuthGuard)
    @Get(':incident_id') 
    async read(@Request() req, @Param('incident_id') incident_id: string) {
        const incident = await this.incidentService.getSingleIncident(incident_id);
        
        return { 
            incident
         }; 
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':incident_id') 
    async delete(@Request() req, @Param('incident_id') incident_id: string) {
        await this.incidentService.deleteIncident(incident_id);
        return null;
    }

}
