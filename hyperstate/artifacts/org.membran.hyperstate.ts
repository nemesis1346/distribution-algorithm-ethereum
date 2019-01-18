import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.membran.hyperstate{
   export class Organization extends Participant {
      email: string;
      pwd: string;
      name: string;
      organizationType: OrganizationType;
      trader: Trader;
   }
   export enum OrganizationType {
      ADMIN,
      DISTRIBUTOR,
      LABEL,
      ARTIST,
   }
   export class Trader extends Participant {
      traderId: string;
      name: string;
      email: string;
      balance: number;
      traderType: TraderType;
      tokenAccount: TokenAccount;
   }
   export enum TraderType {
      DISTRIBUTOR,
      LABEL,
      ARTIST,
      ADMIN,
   }
   export class Track extends Asset {
      isrc: string;
      title: string;
      revenueTotal: number;
      vendorIdentifier: string;
      label: string;
      author: string;
      ownerType: OwnerType;
      trackShares: TrackShare[];
      uploadOwner: Trader;
   }
   export enum OwnerType {
      COMPOSER,
      PRODUCER,
      SONG_WRITER,
      MUSICIAN,
   }
   export class TrackShare {
      traderEmiter: Trader;
      traderReceiver: Trader;
      percentage: number;
   }
   export class TokenAccount {
      balanceEnabled: number;
      balanceDisabled: number;
   }
   export class NotifyNewTrackRevenue extends Event {
      oldValue: number;
      newValue: number;
      track: Track;
   }
   export class TxCreateAgreement extends Transaction {
      track: Track;
      traderEmiter: Trader;
      traderReceiver: Trader;
   }
   export class TxUpdateTrackRevenue extends Transaction {
      newValue: number;
      uploader: Trader;
      track: Track;
   }
   export class TxPaymentDistributionAutomatic extends Transaction {
      track: Track;
      uploader: Trader;
   }
   export class TxPaymentDistributionManual extends Transaction {
      track: Track;
      ammount: number;
      traderEmiter: Trader;
      traderReceiver: Trader;
   }
   export class TxWithdraw extends Transaction {
      withdraw: number;
      trader: Trader;
   }
// }
