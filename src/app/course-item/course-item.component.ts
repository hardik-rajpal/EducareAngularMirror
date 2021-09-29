import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseItem } from './CourseItem';

// public courseItem : CourseItem;

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  courseItem : CourseItem;

  constructor (private route: ActivatedRoute) {
    this.courseItem = { code: "AA101", name: "Fetch name", posts: [] };
  }

  ngOnInit(): void {
    // console.log (JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('code') || '{}')));
    this.courseItem.code = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('code') || '{}'));
  }

}
