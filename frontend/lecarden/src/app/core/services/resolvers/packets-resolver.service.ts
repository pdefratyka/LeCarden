import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { PacketService } from '../api/packet.service';
import { Observable } from 'rxjs';
import { TokenService } from '../security/token.service';

@Injectable({
  providedIn: 'root'
})
export class PacketsResolverService implements Resolve<Packet[]> {
  constructor(
    private readonly packetService: PacketService,
    private readonly tokenService: TokenService
  ) {}

  resolve(): Observable<Packet[]> {
    return this.packetService.getAllPacketsForUser(this.tokenService.getUserId());
  }
}
