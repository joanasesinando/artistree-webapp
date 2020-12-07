import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../../_services/authentication/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  uid: string;
  type: string;

  user = { // TODO
    name: 'Malaikah Aguirre',
    handler: 'malaikahaguirre',
    avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjB8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1',
    following: 57,
    from: 'Porto, Portugal',
    since: 'Aug 2020',
    interests: ['Magic', 'Architecture', 'Music', 'Films', 'Dance']
  };

  reviews = [
    {
      name: 'Harriet Houdini',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      review: 'Egestas cursus malesuada sit massa ultricies ut et. Pulvinar non tortor, ipsum, nunc id hac posuere enim ac.',
      when: '2 weeks ago',
      rate: 4
    },
    {
      name: 'Harriet Houdini',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      review: 'Egestas cursus malesuada sit massa ultricies ut et. Pulvinar non tortor, ipsum, nunc id hac posuere enim ac.',
      when: '2 weeks ago',
      rate: 4
    },
    {
      name: 'Harriet Houdini',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      review: 'Egestas cursus malesuada sit massa ultricies ut et. Pulvinar non tortor, ipsum, nunc id hac posuere enim ac.',
      when: '2 weeks ago',
      rate: 4
    },
    {
      name: 'Harriet Houdini',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      review: 'Egestas cursus malesuada sit massa ultricies ut et. Pulvinar non tortor, ipsum, nunc id hac posuere enim ac.',
      when: '2 weeks ago',
      rate: 4
    }
  ];

  constructor(private router: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.uid = params.uid;

      this.firebaseService.isArtist(this.uid).then(res => {
        res ? this.type = 'artist' : this.type = 'regular';
      });
    });
  }

}
