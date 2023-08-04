import {Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FavsTracks {
    @PrimaryColumn("uuid")
    id: string;
}