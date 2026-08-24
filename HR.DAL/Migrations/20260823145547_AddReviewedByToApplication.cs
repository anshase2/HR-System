using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddReviewedByToApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ReviewedById",
                table: "Applications",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ReviewedById",
                table: "Applications",
                column: "ReviewedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_AspNetUsers_ReviewedById",
                table: "Applications",
                column: "ReviewedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_AspNetUsers_ReviewedById",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_ReviewedById",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "ReviewedById",
                table: "Applications");
        }
    }
}
