import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { SkipAuth } from './decorators/skip-auth.decorator';
import { SignInReqDto } from './dto/req/sign-in.req.dto';
import { SignUpReqDto } from './dto/req/sign-up.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { AuthService } from './services/auth.service';
import { CurrentUser } from "./decorators/current-user.decorator";
import { IUserData } from "./interfaces/user-data.interface";
import { TokenPairResDto } from "./dto/res/token-pair.res.dto";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @SkipAuth()
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @Post('sign-in')
  @SkipAuth()
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @Post('refresh')
  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({summary: 'Refresh token pair'})
  public async refresh(@CurrentUser() userData: IUserData): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @Post('sign-out')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log out user'})
  public async SignOut(@CurrentUser() userData: IUserData): Promise<void> {
    return this.authService.signOut(userData);
  }

}
