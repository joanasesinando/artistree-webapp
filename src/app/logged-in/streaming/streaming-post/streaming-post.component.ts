import {Component, Input, OnInit} from '@angular/core';
import {LivePost} from '../../../_domain/LivePost';

@Component({
  selector: 'app-streaming-post',
  templateUrl: './streaming-post.component.html',
  styleUrls: ['./streaming-post.component.scss']
})
export class StreamingPostComponent implements OnInit {

  @Input() post: LivePost;

  constructor() { }

  ngOnInit(): void {
  }

  scrolldown(): void {
    const element = document.getElementsByClassName('postsWrapper')[0];
    element.scrollTop = element.scrollHeight;
  }

}
