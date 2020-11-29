import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddNoteDto } from './dtos/add.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    addNote(@Body() addNoteDto: AddNoteDto, @Request() req) {
        return this.noteService.addNote(addNoteDto, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getNotes(@Query() query: any, @Request() req) {
        return this.noteService.getNotes(req.user.userId, query.customer_id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteNote(@Query() query: any, @Request() req) {
        return this.noteService.deleteNote(query.customer_id, req.user.userId);
    }
}
