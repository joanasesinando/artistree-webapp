import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../../_services/firebase.service';
import {Live} from '../../../_domain/Live';
import {User} from '../../../_domain/User';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as eva from 'eva-icons';

import * as $ from 'jquery';
import {AlertService} from '../../../_util/alert.service';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent implements OnInit {

  allowClicksInVideo = false;
  showControls = false;

  loadingIframe = true;

  postText = '';

  live: Live;

  artist: User = {handler: '', interests: [], joiningTimestamp: 0, name: '', type: '', uid: ''};
  user: User = {} as User;

  url: SafeResourceUrl;
  private liveVideo: HTMLElement;
  private liveVideoDiv: HTMLElement;
  private liveVideoBar: HTMLElement;
  private liveVideoOverlay: HTMLElement;

  constructor(
    private router: ActivatedRoute,
    private firebaseService: FirebaseService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService
  ) {

    this.router.params.subscribe(params => {
      this.getLiveInfo(params.id);
    });
    this.firebaseService.auth.onIdTokenChanged(id => {
      this.firebaseService.getUserInfo(id.uid).then(user => this.user = user as User);
    });
  }

  getSanitizedLink(): void {
    let link = this.live.link + '?rel=0&autoplay=1&loop=1';
    if (!this.showControls) link += '&controls=0';
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  getLiveInfo(id: string): void {
    this.firebaseService.getLiveInfo(id).then(live => {
      this.live = live;
      if (!live.posts) live.posts = [];
      this.getSanitizedLink();
      this.getArtist();
    });
  }

  getArtist(): void {
    this.firebaseService.getDatabaseData('users/artists/' + this.live.artistID).then(artist => {
      this.artist = artist as User;
    });
  }

  ngOnInit(): void {
    eva.replace();
  }

  getObjs(): void {
    this.liveVideo = document.getElementById('liveVideo');
    this.liveVideoDiv = document.getElementById('liveVideoDiv');
    this.liveVideoBar = document.getElementById('liveVideoBar');
    this.liveVideoOverlay = document.getElementById('liveVideoO');
  }


  fullscreen(): void {
    const e: any = this.liveVideo;
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

  resizeIframe(): void{
    this.loadingIframe = false;
    if (!this.liveVideo) {
      this.getObjs();
    }
    const w = this.liveVideoDiv.offsetWidth;
    const h = Math.ceil(w / 1.7778);

    this.liveVideo.style.height = h + 'px';
    this.liveVideo.style.width = w + 'px';
    this.liveVideoOverlay.style.height = h + 'px';
    this.liveVideoOverlay.style.width = w + 'px';
    this.liveVideoBar.style.width = w + 0.5 + 'px';
  }

  getCurrentTime(): string {
    const date = new Date();
    return date.toISOString().substr(11, 5);
  }

  makePost(avatar: string, name: string, text: string): void {
    this.live.posts.push({avatar, name, text, time: this.getCurrentTime()});
    this.firebaseService.setLiveInfo(this.live);
  }

  sendPost(): void {
    if (!this.postText) return;
    this.makePost(this.user.avatar, this.user.name, this.postText);
    this.postText = '';
  }

  cheer(): void {
    this.makePost('https://firebasestorage.googleapis.com/v0/b/artistree-78c6a.appspot.com/o/heart.png?alt=media&token=7d6547d7-43d3-4797-ae44-a2d214c5ceab', this.user.name + ' sent a cheer!', '');
    this.alertService.showAlert('Cheering sent', this.artist.name + ' just received your cheering!', 'love');
  }

  bid(amount: number): void {
    this.makePost('https://firebasestorage.googleapis.com/v0/b/artistree-78c6a.appspot.com/o/bid.png?alt=media&token=9fac52a3-23e4-4b01-bb90-c4f36420d0e2', this.user.name + ' tipped ' + amount + '€!', '');
    this.alertService.showAlert('Tip sent', this.artist.name + ' just received your tip!', 'tip');
  }
}
