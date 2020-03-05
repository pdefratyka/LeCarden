import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PacketService } from '../api/packet.service';
import { Packet } from 'src/app/shared/models/packet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SinglePacketResolverService implements Resolve<Packet> {
  constructor(private readonly packetService: PacketService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Packet> {
    return this.packetService.getPacketById(route.paramMap.get('id'));
  }
}
