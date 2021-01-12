import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { PacketService } from '../api/packet.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacketsResolverService implements Resolve<Packet[]> {
  constructor(private readonly packetService: PacketService) {}

  resolve(): Observable<Packet[]> {
    console.log('Packet Resolver');
    return this.packetService.getAllPacketsForUser();
  }
}
