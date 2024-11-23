import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';


@Controller('/')
export class AppController {
    @Public()
    @Get('/')
    getRoot() {
        return { message: 'Welcome to YouApp!' };
    }
}

