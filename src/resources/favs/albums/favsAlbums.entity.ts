import {Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FavsAlbums {
    @PrimaryColumn("uuid")
    id: string;
}