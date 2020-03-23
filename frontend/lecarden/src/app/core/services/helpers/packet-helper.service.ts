import { Injectable } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';

@Injectable({
  providedIn: 'root'
})
export class PacketHelperService {
  filterPackets(packets: Packet[], filter: string): Packet[] {
    return packets.filter(p => p.name.includes(filter));
  }
}
