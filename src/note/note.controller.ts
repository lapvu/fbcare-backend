import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddNoteDto } from './dtos/add.dto';
import { DeleteNote, GetNotes } from './dtos/get.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    addNote(@Body() addNoteDto: AddNoteDto, @Request() req) {
        const { group_id, user_id } = req.user;
        return this.noteService.addNote(addNoteDto, group_id, user_id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getNotes(@Query() query: GetNotes, @Request() req) {
        return this.noteService.getNotes(req.user.group_id, query.customer_id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteNote(@Query() query: DeleteNote, @Request() req) {
        return this.noteService.deleteNote(query, req.user.user_id);
    }
}
