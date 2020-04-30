import { Injectable } from '@angular/core';
import { PacketService } from '../api/packet.service';
import { Packet } from 'src/app/shared/models/packet';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilteredPacketResolverService implements Resolve<Packet> {
  constructor(
    private readonly packetService: PacketService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Packet> {
    return this.packetService.getFilteredPacket();
  }
}
