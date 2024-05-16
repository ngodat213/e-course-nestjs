import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put, Query, Res, Scope, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ContactService } from './contact.service';
import { Contact } from 'src/modules/contact/contact.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
import { Observable, map } from 'rxjs';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { HasRoles } from 'src/auth/guard/has-roles.decorator';
import { RoleType } from 'src/shared/enum/role.type.enum';

@ApiTags('Contact')
@ApiBearerAuth()
@Controller({path: 'contacts', scope: Scope.REQUEST})
export class ContactController {
  constructor(private contactSerivce: ContactService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  getAllContacts(
    @Query('q')  keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Contact[]> {
    return this.contactSerivce.findAll(keyword, skip, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  getContactById(@Param('id', ParseObjectIdPipe)id : string) : Promise<Contact>{
    return this.contactSerivce.findById(id);
  }

  @Post('')
  createContact(
    @Body() contact: CreateContactDTO,
  ) {
    return this.contactSerivce.save(contact);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  updateContact(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() contact: UpdateContactDTO,
    @Res() res: Response, 
  ) :Promise<Contact>{
    return this.contactSerivce.updateById(id, contact);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  deleteContactById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ){
    return this.contactSerivce.deleteById(id);
  }
}
