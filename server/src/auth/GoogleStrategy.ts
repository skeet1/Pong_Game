import { PassportStrategy } from "@nestjs/passport";
import {Profile, Strategy } from "passport-google-oauth20"
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly config: ConfigService)
    {
        super({
            clientID: config.get('GOOGLE_CLIENT_ID'),
            clientSecret: config.get('GOOGLE_CLIENT_SECRET_KEY'),
            callbackURL: config.get('CALL_BACK_URL'),
            scope: ['profile', 'email'],
        })
    }
    
    async validate(accessToken: string, refreshToken: string, profile: Profile)
    {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
    }
}