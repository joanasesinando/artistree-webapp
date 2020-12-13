import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../../_services/firebase.service';
import {Live} from '../../../_domain/Live';
import {User} from '../../../_domain/User';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as eva from 'eva-icons';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent implements OnInit {

  allowClicksInVideo = false;
  showControls = false;




  loading: boolean = true;
  loadingIframe: boolean = true;

  live: Live;

  artist: User = {handler: '', interests: [], joiningTimestamp: 0, name: '', type: '', uid: ''};

  //  free: boolean;
  //   artistID: string;
  //   name: string;
  //   tags: string[];
  //   thumbnail: string;
  url: SafeResourceUrl;
  private liveVideo: HTMLElement;
  private liveVideoDiv: HTMLElement;
  private liveVideoBar: HTMLElement;
  private liveVideoOverlay: HTMLElement;
  private liveVideoJ: HTMLElement;

  constructor(private router: ActivatedRoute, private firebaseService: FirebaseService, private sanitizer: DomSanitizer) {
    let l: Live = {
      id: "0",
      free: true,
      artistID: "32xBShZg1oMMj7bANbz8NgyfZYy2",
      name: "Live 123",
      tags: ["fun", "free", "tag2"],
      thumbnail: "https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    }

    // this.firebaseService.setLiveInfo(l).then(r=>r);
    this.router.params.subscribe(params => {
      this.getLiveInfo(params.id);
    });
  }

  getSanitizedLink() {
    let link = this.live.link + "?rel=0&autoplay=1&loop=1"
    if (!this.showControls) link += "&controls=0"
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  getLiveInfo(id: string): void {
    this.firebaseService.getLiveInfo(id).then(live => {
      this.live = live;
      this.getSanitizedLink()
      this.getArtist();

    })
  }

  getArtist(): void {
    this.firebaseService.getDatabaseData('users/artists/' + this.live.artistID).then(artist => {
      this.artist = artist as User;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    eva.replace();
  }

  getObjs() {
    this.liveVideo = document.getElementById("liveVideo");
    this.liveVideoDiv = document.getElementById("liveVideoDiv");
    this.liveVideoBar = document.getElementById("liveVideoBar");
    this.liveVideoOverlay = document.getElementById("liveVideoO");
  }


  fullscreen() {
    let e: any = this.liveVideo;
    if (e.requestFullscreen) {
      e.requestFullscreen();
    } else if (e.webkitRequestFullscreen) {
      e.webkitRequestFullscreen();
    } else if (e.mozRequestFullScreen) {
      e.mozRequestFullScreen();
    } else if (e.msRequestFullscreen) {
      e.msRequestFullscreen();
    }
  }

  resizeIframe() {
    if (!this.liveVideo) {
      this.getObjs()
    }
    let w = this.liveVideoDiv.offsetWidth;
    let h = Math.ceil(w / 1.7778);

    this.liveVideo.style.height = h + "px";
    this.liveVideo.style.width = w + "px";
    this.liveVideoOverlay.style.height = h + "px";
    this.liveVideoOverlay.style.width = w + "px";
    this.liveVideoBar.style.width = w+0.5 + "px";
  }

}
