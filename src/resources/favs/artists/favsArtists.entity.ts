import {Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FavsArtists {
    @PrimaryColumn("uuid")
    id: string;
}