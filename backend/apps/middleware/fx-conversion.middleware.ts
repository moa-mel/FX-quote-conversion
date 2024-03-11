import { Injectable, NestMiddleware, UnauthorizedException, } from "@nestjs/common";
import * as passport from "passport";
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class FxConversionMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.headers['x-api-key'];
    
        if (!apiKey) {
          return res.status(401).json({ message: 'API Key is missing' });
        }
        next();
      }
    }