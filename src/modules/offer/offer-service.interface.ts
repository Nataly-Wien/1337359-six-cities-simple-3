import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findOfferByTitle(title: string): Promise<DocumentType<OfferEntity> | null>;
  findOrCreateOffer(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
}