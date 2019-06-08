import { Component, OnInit, ViewChild, ElementRef, NgZone, Inject } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-locationfind',
  templateUrl: './locationfind.component.html',
  styleUrls: ['./locationfind.component.css']
})

export class LocationfindComponent implements OnInit {
  title: string = 'USA Map Search';
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
  country: string;
  isBrowser;

  @ViewChild('search')
  public searchElementRef: ElementRef;
 
  constructor(@Inject(PLATFORM_ID) private platformId, 
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { this.isBrowser = isPlatformBrowser(platformId); }

  ngOnInit() {
    //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["(cities)"],
        componentRestrictions: {country: 'us'}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 12;
        });
      });
    });
  }
 
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.checkCountry(position.coords.latitude, position.coords.longitude);
        if(this.country == "United States"){
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);
        }else{
          this.latitude = 34.066728;
          this.longitude = -118.407056;
          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);
        }
      });
    }
    else{
      this.latitude = 34.066728;
      this.longitude = -118.407056;
      this.zoom = 12;
      this.getAddress(this.latitude, this.longitude);
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) { 
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  checkCountry(latitude, longitude){
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.country = results[results.length-1].formatted_address;
          //console.log(this.country);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }
}
