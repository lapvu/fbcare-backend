import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddNoteDto } from './dtos/add.dto';
import { DeleteNote } from './dtos/get.dto';
import { Note, NoteDocument } from './model/note.model';

@Injectable()
export class NoteService {
    constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) { }

    async addNote(addNoteDto: AddNoteDto, group_id: string, create_by: string): Promise<any> {
        const note = await this.noteModel.create({ ...addNoteDto, group_id, create_by });
        return note;
    }

    async getNotes(group_id: string, customer_id: string): Promise<any> {
        const notes = await this.noteModel.find({ group_id, customer_id }).sort({ "updatedAt": -1 });
        return notes;
    }

    async deleteNote(deleteNote: DeleteNote, user_id: string): Promise<any> {
        console.log(user_id, deleteNote);
        const done = await this.noteModel.remove({ _id: deleteNote.note_id, create_by: user_id });
        return done;
    }

    async countNote(group_id: string): Promise<any> {
        const total = await this.noteModel.count({ group_id });
        return total;
    }
}
