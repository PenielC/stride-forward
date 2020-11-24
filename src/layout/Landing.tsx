import React, { Component } from "react";
import {Button, InputNumber} from 'antd';
import 'antd/dist/antd.css';
import './Landing.css';

interface State{
  res:number,
  cols:number,
  rows:number,
  width:number,
  height:number,
  grid: number[][]
 
}

class Landing extends Component<{}, State>{
  state={
    res:10,
    cols:0,
    rows:0,
    width:400,
    height:400,
    grid:[]
    
}

componentDidMount(){
  this.handleStart();
}

updateColsRows(setCols:number, setRows:number){
  this.setState({
    cols:setCols, rows:setRows
  });
}

update = (ctx:any)=>{

  var newgrid = this.newGen(this.state.grid);
 
  for(var i =0; i < newgrid.length; i++)
    {
        for(var j = 0; j < newgrid[i].length; j++)
        {
            const cell = newgrid[i][j];
            
            if(ctx !=null){
              ctx.beginPath();
              ctx.rect(i * this.state.res, j * this.state.res, this.state.res, this.state.res);
              ctx.fillStyle = cell?'black':'white';
              ctx.fill();
              //ctx.stroke();
            }          
        }
    }

    this.setState({grid:newgrid}, ()=>{
      window.requestAnimationFrame(()=>{this.update(ctx)});
    });
}

buildGrid = ()=>{
  return new Array(this.state.cols).fill(null)
  .map(()=> new Array(this.state.rows).fill(null)
  .map(() => Math.floor(Math.random() * 2 )));
}

handleStart=()=>{
  const canvas = document.querySelector('canvas');
  if(canvas){
    let ctx = canvas.getContext('2d');
    canvas.width = this.state.width;
    canvas.height = this.state.height;

    let setCols = canvas.width/this.state.res;
    let setRows = canvas.height/this.state.res;

    this.setState({
      cols:setCols, rows:setRows
    }, ()=>{

      let setGrid = this.buildGrid();
    
      this.setState({grid:setGrid}, ()=>{
        window.requestAnimationFrame(()=>{this.update(ctx)});
      });     
    });
  }

}

handleSize = (e:any)=>{
  this.setState({
    width: e,
    height: e
  })
}

handleGen = (e:any)=>{
  this.setState({
    res: e
  })
}

newGen = (grid:number[][])=>{
  let newGen = grid.map(arr =>[...arr]);
  for(var i =0; i < grid.length; i++)
  {
      for(var j = 0; j < grid[i].length; j++)
      {
          let cell = grid[i][j];
          let neighbourCount = 0;
          for(var k = -1; k < 2; k++)
          {
              for(var l = -1; l < 2; l++)
              {
                  if(k === 0 && l === 0 )
                  {
                      continue;
                  }
                  const x = i + k;
                  const y = j + l;

                  if(x >= 0 && y >= 0 && x < this.state.cols && y < this.state.rows)
                  {
                      const neighbour = grid[i + k][j + l];
                      neighbourCount += neighbour;

                  }                 
              }
          }
          //check rules
          if(cell === 1 && neighbourCount < 2)
          {
              newGen[i][j] = 0;
          }
          else if(cell === 1 && neighbourCount > 3)
          {
              newGen[i][j] = 0;
          }else if(cell === 0 && neighbourCount === 3)
          {
              newGen[i][j] = 1;
          }
      }
  }
  return newGen;
}


render() {  
 
    return (
      <div>
        <h1>Conway's Game of Life</h1>
        <div className="input-pos">        
          <InputNumber value={this.state.width} onChange={(e)=>{this.handleSize(e)}}>Size</InputNumber>
          <InputNumber value={this.state.res} onChange={(e)=>{this.handleGen(e)}}>Generations</InputNumber>
          <Button type="primary" onClick={()=>{this.handleStart()}}>Start</Button>
        </div>
        <canvas></canvas> 
        
      </div>
    );
  }
}
export default Landing;
