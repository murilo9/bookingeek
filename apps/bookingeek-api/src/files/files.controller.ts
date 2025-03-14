import { User } from '@bookingeek/core';
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongodb';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IdentityGuard } from 'src/common/guards/identity.guard';

@Controller('files')
export class FilesController {
  constructor() {}

  /**
   * Called when the user uploads a picture.
   */
  @UseGuards(IdentityGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public', // Change this to your desired directory
        filename: (req, file, cb) => {
          const fileExt = extname(file.originalname); // Get original extension
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`); // Preserve extension
        },
      }),
    }),
  )
  uploadPicture(
    @Req()
    request: {
      user: User<ObjectId>;
    },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10 * 1000 * 1024,
            message: 'File size should be smaller than 10MB',
          }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|webp)$/ }),
        ],
        errorHttpStatusCode: 400,
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      path: file.path,
      mimeType: file.mimetype,
    };
  }
}
