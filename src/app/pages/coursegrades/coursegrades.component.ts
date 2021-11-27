import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-coursegrades',
  templateUrl: './coursegrades.component.html',
  styleUrls: ['./coursegrades.component.css']
})
export class CoursegradesComponent implements OnInit{

  constructor(private taskService:AssignmentService, private route:ActivatedRoute) { }
  data:any[] = []
  taskGrades:any[] = []
  courseGrades:any[] = []

  canvas1: any;     // student
  ctx1: any;
  Chart1: any;

  canvas2: any;     // teacher
  ctx2: any;
  Chart2: any;

  ngOnInit(): void {

    let courseid = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('coursecode') || '{}'));
    let userid = localStorage.getItem('userid')!;
    this.taskService.getGradesData(courseid, userid).subscribe(data=>{

      console.log(data);
      this.data = data;
      this.taskGrades = data.taskGrades;
      this.courseGrades = data.courseGrades;
    
      this.canvas1 = document.getElementById('studentCanvas');
      this.ctx1 = this.canvas1.getContext('2d');
      var labels = [], data_student = [], data_avg = [], data_variance = [];
      var cumulScore, meanscore, variance;

      for (let key in this.courseGrades) {
        if (key=='cumulScore') {
          cumulScore = this.courseGrades[key];
        }
        else if (key=='meanscore') {
          meanscore = this.courseGrades[key];
        }
        else if (key=='variance') {
          variance = this.courseGrades[key];
        }
        // Use `key` and `value`
      }

      // use colors repeatedly
      var backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)'
      ];

      for (let i=0; i<this.taskGrades.length; i++) {
        if (this.taskGrades[i].Graded == true) {
          labels.push(this.taskGrades[i].task);
          data_student.push(this.taskGrades[i].score);
          data_avg.push(this.taskGrades[i].meanscore);
          data_variance.push(this.taskGrades[i].variance);
        }
      }

      this.Chart1 = new Chart(this.ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                type: 'bar',
                label: 'Your Score',
                data: data_student,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }, {
                type: 'line',
                label: 'Average Score',
                data: data_avg,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                pointStyle: 'circle',
                pointRadius: 7,
                pointBackgroundColor: 'rgba(75, 192, 192)',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    // suggestedMax: 100,
                }
            },
            responsive: false,          // to rescale
            plugins: {
                title: {
                    display: true,
                    text: courseid,
                    color: 'blue'
                },
                subtitle: {
                    display: true,
                    text: ['Student View | Overalls for this course', 'Cumulative Score: '+cumulScore+', Mean Score: '+meanscore],
                    color: 'blue',
                    font: {
                      size: 12,
                      weight: 'normal',
                      style: 'italic'
                    },
                    padding: {
                      bottom: 10
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        color: 'rgb(0, 0, 0)'
                    }
                }
            }
        }
    });

    this.canvas2 = document.getElementById('teacherCanvas');
    this.ctx2 = this.canvas2.getContext('2d');
    this.Chart2 = new Chart(this.ctx2, {
      type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                type: 'bar',
                label: 'Average Score',
                data: data_avg,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
                yAxisID: 'y',
            }, {
                type: 'line',
                label: 'Variance',
                data: data_variance,
                fill: false,
                borderColor: 'rgba(75, 192, 192)',
                tension: 0.1,
                yAxisID: 'y1',
                pointStyle: 'circle',
                pointRadius: 7,
                pointBackgroundColor: 'rgba(75, 192, 192)',
            }]
        },
        options: {
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false, // don't show grid lines for right axis
                    }
                }
            },
            responsive: false,          // to rescale
            plugins: {
                title: {
                    display: true,
                    text: courseid,
                    color: 'rgb(0, 0, 255)'
                },
                subtitle: {
                    display: true,
                    text: ['Instructor View | Overalls for this course', 'Mean Score: '+meanscore+', Variance: '+variance],
                    color: 'blue',
                    font: {
                      size: 12,
                      weight: 'normal',
                      style: 'italic'
                    },
                    padding: {
                      bottom: 10
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        color: 'black',
                        // usePointStyle: true,
                    }
                }
            }
        }
    });

    })
  }
}