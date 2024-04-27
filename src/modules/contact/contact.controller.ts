import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ContactService } from './contact.service';
import { Contact } from 'src/modules/contact/contact.model';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';

@ApiTags('Contact')
@Controller({path: 'contacts', scope: Scope.REQUEST})
export class ContactController {
  constructor(private contactSerivce: ContactService){}

  @Get('')
  getAllContacts(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<Contact[]>{
    return this.contactSerivce.findAll(keyword, limit, skip);
  }

  @Get(':id')
  getContactById(@Param('id', ParseObjectIdPipe)id : string) : Observable<Contact>{
    return this.contactSerivce.findById(id);
  }

  @Post('')
  createContact(
    @Body() contact: CreateContactDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.contactSerivce.save(contact).pipe(
      map((contact) => {
        return res
        .location('/contacts/' + contact._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateContact(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() contact: UpdateContactDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.contactSerivce.update(id, contact).pipe(
      map((contact) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
  deleteContactById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.contactSerivce.deleteById(id).pipe(
      map((contact) => {
        return res.status(204).send();
      }),
    );
  }
}
